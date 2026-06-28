
import asyncHandler  from "../utils/asyncHandler.js";
import  ApiResponse  from "../utils/ApiResponse.js";
import  ApiError  from "../utils/ApiError.js";
import axios from "axios";
import crypto from "crypto";

import Session from "../models/Session.models.js";
import Practitioner from "../models/Practitioner.models.js";
import Patient from "../models/Patient.models.js";
import AuditLog from "../models/AuditLog.models.js";
import Notification from "../models/Notification.models.js";
import RescheduleRequest from "../models/RescheduleRequest.models.js";


const AI_BASE = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// Simple in-memory reservation store for demo (TTL based).
// In production use Redis (recommended) for cross-process reservations.
const reservations = new Map(); // token -> {payload, expiresAt}
const RESERVATION_TTL_MS = 2 * 60 * 1000; // 2 minutes

function createReservationToken(payload) {
  const token = crypto.randomBytes(16).toString('hex');
  reservations.set(token, { payload, expiresAt: Date.now() + RESERVATION_TTL_MS });
  return token;
}
function getReservation(token) {
  const entry = reservations.get(token);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { reservations.delete(token); return null; }
  return entry.payload;
}


function deleteReservation(token) { reservations.delete(token); }

// Helper: minimal conflict check (practitioner)
async function hasConflict(practitionerId, start, end, excludeSessionId = null) {
  const q = {
    practitionerId,
    $or: [
      { scheduledStart: { $lt: end }, scheduledEnd: { $gt: start } }
    ],
    status: { $in: ['booked', 'confirmed', 'rescheduled'] }
  };
  if (excludeSessionId) q._id = { $ne: excludeSessionId };
  const conflict = await Session.findOne(q).lean();
  return !!conflict;
}

// POST /api/sessions/recommend
// export const recommendSlots = asyncHandler(async (req, res) => {
//   const { therapyType, preferredDays = 3, durationMinutes } = req.body;
//   // 1) Find practitioners who can do the therapy
//   const practitioners = await Practitioner.find({
//     'specialization.therapyType': therapyType,
//     isActive: true
//   }).lean();

//   console.log(practitioners)

//   if (!practitioners.length) return res.status(200).json(new ApiResponse(200, [], 'No practitioners available'));

//   // 2) Generate candidate slots (basic heuristic: next N days * sample hours)
//   const now = new Date();
//   const candidates = [];

//   // for (const pr of practitioners) {
//   //   // Use practitioner.workingHours if available; fallback to sample hours
//   //   const sampleHours = Array.isArray(preferredHours) && preferredHours.length ? preferredHours : [9, 11, 14, 16];
//   //   for (let d = 0; d < (preferredDays || 3); d++) {
//   //     const day = new Date(now); day.setDate(now.getDate() + d);
//   //     for (const hour of sampleHours) {
//   //       const start = new Date(day);
//   //       start.setHours(hour, 0, 0, 0);
//   //       if (start < now) continue;
//   //       const dur = durationMinutes || (pr.durationEstimates && pr.durationEstimates.get && pr.durationEstimates.get(therapyType)) || (pr.durationEstimates && pr.durationEstimates[therapyType]) || 60;
//   //       const end = new Date(start.getTime() + dur * 60000);
//   //       // quick conflict filter: do not propose slots that immediately conflict
//   //       const conflict = await Session.findOne({
//   //         practitionerId: pr._id,
//   //         scheduledStart: { $lt: end },
//   //         scheduledEnd: { $gt: start },
//   //         status: { $in: ['booked', 'confirmed', 'rescheduled'] }
//   //       }).lean();
//   //       if (conflict) continue;
//   //       candidates.push({
//   //         practitionerId: pr._id.toString(),
//   //         practitionerName: pr.name,
//   //         start: start.toISOString(),
//   //         end: end.toISOString(),
//   //         durationMinutes: dur,
//   //         centerId: pr.centerId ? pr.centerId.toString() : null
//   //       });
//   //     }
//   //   }
//   // }

//   for (const pr of practitioners) {
//   const workingHours = Array.isArray(pr.workingHours) ? pr.workingHours : [];
//   const practitionerDuration = durationMinutes || 
//     (pr.durationEstimates?.get?.(therapyType) || 
//      pr.durationEstimates?.[therapyType] || 
//      60); // fallback default

//   for (let d = 0; d < (preferredDays || 3); d++) {
//     const day = new Date(now);
//     day.setDate(now.getDate() + d);
//     const weekday = day.getDay(); // 0=Sunday

//     const todayHours = workingHours.find(w => w.dayOfWeek === weekday && w.isActive);
//     if (!todayHours) continue; // skip non-working days

//     const [startH, startM] = todayHours.startTime.split(':').map(Number);
//     const [endH, endM] = todayHours.endTime.split(':').map(Number);

//     const dayStart = new Date(day);
//     dayStart.setHours(startH, startM, 0, 0);
//     const dayEnd = new Date(day);
//     dayEnd.setHours(endH, endM, 0, 0);

//     // Skip if working window already passed today
//     if (dayEnd < now) continue;

//     // Use a step interval for slot generation (30 minutes)
//     const SLOT_STEP_MINUTES = 30;
//     let current = new Date(dayStart);

//     while (current.getTime() + practitionerDuration * 60000 <= dayEnd.getTime()) {
//       const end = new Date(current.getTime() + practitionerDuration * 60000);

//       // Final conflict check (skip overlapping sessions)
//       const conflict = await Session.exists({
//         practitionerId: pr._id,
//         scheduledStart: { $lt: end },
//         scheduledEnd: { $gt: current },
//         status: { $in: ['booked', 'confirmed', 'rescheduled'] }
//       });

//       if (!conflict) {
//         candidates.push({
//           practitionerId: pr._id.toString(),
//           practitionerName: pr.name,
//           start: current.toISOString(),
//           end: end.toISOString(),
//           durationMinutes: practitionerDuration,
//           centerId: pr.centerId?.toString() || null,
//           therapyType
//         });
//       }

//       // Increment current time by step size
//       current = new Date(current.getTime() + SLOT_STEP_MINUTES * 60000);
//     }
//   }
// }

// // for (const pr of practitioners) {
// //   const workingHours = Array.isArray(pr.workingHours) ? pr.workingHours : [];

// //   // Keep the requested duration, fallback 60
// //   const practitionerDuration = durationMinutes || 60;

// //   for (let d = 0; d < (preferredDays || 3); d++) {
// //     const day = new Date(now);
// //     day.setDate(now.getDate() + d);
// //     const weekday = day.getDay(); // 0 = Sunday

// //     const todayHours = workingHours.find(w => w.dayOfWeek === weekday && w.isActive);
// //     if (!todayHours) continue; // skip non-working days

// //     const [startH, startM] = todayHours.startTime.split(':').map(Number);
// //     const [endH, endM] = todayHours.endTime.split(':').map(Number);

// //     const dayStart = new Date(day);
// //     dayStart.setHours(startH, startM, 0, 0);
// //     const dayEnd = new Date(day);
// //     dayEnd.setHours(endH, endM, 0, 0);

// //     // ⏰ Skip if day window already passed
// //     if (dayEnd < now) continue;

// //     // Allow a lenient overlap window (±15 minutes)
// //     const LENIENCY_MINUTES = 15;

// //     // Slot step size
// //     const SLOT_STEP_MINUTES = 30;
// //     let current = new Date(dayStart);

// //     while (current.getTime() + practitionerDuration * 60000 <= dayEnd.getTime()) {
// //       const end = new Date(current.getTime() + practitionerDuration * 60000);

// //       // Slightly expand search window for conflicts to be more forgiving
// //       const startCheck = new Date(current.getTime() - LENIENCY_MINUTES * 60000);
// //       const endCheck = new Date(end.getTime() + LENIENCY_MINUTES * 60000);

// //       // 🧠 Conflict check (lenient: small overlaps are okay)
// //       const conflict = await Session.exists({
// //         practitionerId: pr._id,
// //         // allow small overlaps by expanding the comparison window
// //         scheduledStart: { $lt: endCheck },
// //         scheduledEnd: { $gt: startCheck },
// //         status: { $in: ['booked', 'confirmed', 'rescheduled'] }
// //       });

// //       // Accept slot even if slight overlap or near boundary
// //       if (!conflict) {
// //         candidates.push({
// //           practitionerId: pr._id.toString(),
// //           practitionerName: pr.name,
// //           start: current.toISOString(),
// //           end: end.toISOString(),
// //           durationMinutes: practitionerDuration,
// //           centerId: pr.centerId?.toString() || null,
// //           therapyType
// //         });
// //       }

// //       // Move by step size (still 30 minutes)
// //       current = new Date(current.getTime() + SLOT_STEP_MINUTES * 60000);
// //     }
// //   }
// // }


//   if (!candidates.length) return res.status(200).json(new ApiResponse(200, [], 'No candidate slots'));

//   // 3) Call AI service to score/rank candidates
//   try {
//     // const payload = { candidates: candidates.map(c => ({
//     //   practitionerId: c.practitionerId,
//     //   start: c.start,
//     //   durationMinutes: c.durationMinutes,
//     //   dayOfWeek: new Date(c.start).getDay(),
//     //   hourOfDay: new Date(c.start).getHours()
//     //   // include any other features you want (practitioner load, patient availability, etc.)
//     // })) };

//     const payload = {
//   request_id: crypto.randomUUID(), // REQUIRED
//   patient_id: patientId, // optional but good to include
//   therapy_type: therapyType,
//   candidates: candidates.map(c => ({
//     practitionerId: c.practitionerId,
//     centerId: c.centerId,
//     start: c.start,
//     end: c.end, // REQUIRED
//     durationMinutes: c.durationMinutes,
//     practitioner_load: 0.0,
//     patient_flexibility: 1.0,
//     day_of_week: new Date(c.start).getDay(),
//     hour_of_day: new Date(c.start).getHours(),
//     extra: {}
//   })),
//   context: {}
// };

//     console.log(payload)
//     const aiResp = await axios.post(`${AI_BASE}/predict_slots`, payload, { timeout: 10000 });
//     const ranked = aiResp.data && (aiResp.data.recommendations || aiResp.data.top_recommendations || aiResp.data) ;

//     // Match AI scores to candidates; assume same order (or map by practitioner+start)
//     const scored = candidates.map(c => {
//       // try to find a matching item in ranked by practitionerId+start
//       const match = Array.isArray(ranked)
//         ? ranked.find(r => (r.practitionerId === c.practitionerId && new Date(r.start).toISOString() === new Date(c.start).toISOString()))
//         : null;
//       return {
//         ...c,
//         score: match ? (match.score || match.predicted_score || match.probability || 0) : 0.5
//       };
//     });

//     // 4) Create a reservation token for each candidate set (frontend can ask to confirm using that token)
//     // We'll return the top N candidates and a reservationToken for the selected candidate (frontend sends token + candidate index to confirm)
//     const top = scored.sort((a, b) => b.score - a.score).slice(0, 10);

//     // Store full top array as a reservation payload keyed by token
//     const reservationToken = createReservationToken({ top, createdBy: req.user ? req.user.id : null });
//     return res.status(200).json(new ApiResponse(200, { top, reservationToken }, 'Recommendations'));
//   } catch (err) {
//     console.error('AI call failed:', err?.response?.data || err.message);
//     // fallback: return heuristic scored candidates
//     const top = candidates.map(c => ({ ...c, score: 0.5 })).slice(0, 10);
//     const reservationToken = createReservationToken({ top, createdBy: req.user ? req.user.id : null });
//     return res.status(200).json(new ApiResponse(200, { top, reservationToken }, 'Recommendations (fallback)'));
//   }
// });

export const recommendSlots = asyncHandler(async (req, res) => {
  const { therapyType, preferredDays = 3, durationMinutes} = req.body;

  const patientId = req.user && req.user.id;
  if (!patientId) throw new ApiError(401, 'Login required');

  // 1️⃣ Fetch all practitioners who provide this therapy
  const practitioners = await Practitioner.find({
    'specialization.therapyType': therapyType,
    isActive: true
  }).lean();

  console.log(practitioners)
  if (!practitioners.length)
    return res.status(200).json(new ApiResponse(200, [], 'No practitioners available'));

  // 2️⃣ Fetch patient (to evaluate flexibility)
  const patient = patientId ? await Patient.findById(patientId).lean() : null;

  // Calculate patient flexibility (how many days/hours they’re available)
  let patientFlexibility = 1.0;
  if (patient?.availability?.length) {
    const activeSlots = patient.availability.filter(a => a.isActive);
    const totalWeeklyHours = activeSlots.reduce((acc, a) => {
      const [sh, sm] = a.startTime.split(':').map(Number);
      const [eh, em] = a.endTime.split(':').map(Number);
      return acc + ((eh * 60 + em) - (sh * 60 + sm)) / 60;
    }, 0);
    // More available hours = more flexibility (scale 0.3–1.0)
    patientFlexibility = Math.min(1.0, Math.max(0.3, totalWeeklyHours / 40));
  }

  const now = new Date();
  const candidates = [];

  // 3️⃣ Generate possible slots from practitioner working hours
  for (const pr of practitioners) {
    const workingHours = Array.isArray(pr.workingHours) ? pr.workingHours : [];
    const practitionerDuration =
      durationMinutes ||
      pr.durationEstimates?.get?.(therapyType) ||
      pr.durationEstimates?.[therapyType] ||
      60;

    // Compute practitioner load (sessions per day ÷ max)
    const today = new Date();
    const activeSessionsToday = await Session.countDocuments({
      practitionerId: pr._id,
      scheduledStart: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lte: new Date(today.setHours(23, 59, 59, 999))
      },
      status: { $in: ['booked', 'completed', 'rescheduled'] }
    });

    const practitionerLoad = Math.min(1.0, activeSessionsToday / pr.maxPatientsPerDay);

    for (let d = 0; d < (preferredDays || 3); d++) {
      const day = new Date(now);
      day.setDate(now.getDate() + d);
      const weekday = day.getDay();

      const todayHours = workingHours.find(w => w.dayOfWeek === weekday && w.isActive);
      if (!todayHours) continue;

      const [startH, startM] = todayHours.startTime.split(':').map(Number);
      const [endH, endM] = todayHours.endTime.split(':').map(Number);

      const dayStart = new Date(day);
      dayStart.setHours(startH, startM, 0, 0);
      const dayEnd = new Date(day);
      dayEnd.setHours(endH, endM, 0, 0);

      if (dayEnd < now) continue;

      const SLOT_STEP_MINUTES = 30;
      let current = new Date(dayStart);

      while (current.getTime() + practitionerDuration * 60000 <= dayEnd.getTime()) {
        const end = new Date(current.getTime() + practitionerDuration * 60000);

        const conflict = await Session.exists({
          practitionerId: pr._id,
          scheduledStart: { $lt: end },
          scheduledEnd: { $gt: current },
          status: { $in: ['booked', 'confirmed', 'rescheduled'] }
        });

        if (!conflict) {
          candidates.push({
            practitionerId: pr._id.toString(),
            practitionerName: pr.name,
            start: current.toISOString(),
            end: end.toISOString(),
            durationMinutes: practitionerDuration,
            centerId: pr.centerId?.toString() || null,
            therapyType,
            practitioner_load: practitionerLoad,
            patient_flexibility: patientFlexibility
          });
        }

        current = new Date(current.getTime() + SLOT_STEP_MINUTES * 60000);
      }
    }
  }

  if (!candidates.length)
    return res.status(200).json(new ApiResponse(200, [], 'No candidate slots found'));

  // 4️⃣ Send candidate slots to AI scheduler for ranking
  const payload = {
    request_id: crypto.randomUUID(),
    patient_id: patientId || null,
    therapy_type: therapyType,
    candidates: candidates.map(c => ({
      practitionerId: c.practitionerId,
      centerId: c.centerId,
      start: c.start,
      end: c.end,
      durationMinutes: c.durationMinutes,
      practitioner_load: c.practitioner_load,
      patient_flexibility: c.patient_flexibility,
      day_of_week: new Date(c.start).getDay(),
      hour_of_day: new Date(c.start).getHours(),
      extra: {
        extra: {
  practitioner_avg_rating: practitioners.find(p => p._id.toString() === c.practitionerId)?.ratings?.average || 3.5,
  center_utilization: 0.5
}
    }
    })),
    context: {}
  };

  try {
    const aiResp = await axios.post(`${AI_BASE}/predict_slots`, payload, { timeout: 10000 });
    const ranked = aiResp.data?.recommendations || aiResp.data || [];

    const scored = candidates.map(c => {
      const match = ranked.find(
        r =>
          r.practitionerId === c.practitionerId &&
          new Date(r.start).toISOString() === new Date(c.start).toISOString()
      );
      return {
        ...c,
        score: match?.score ?? 0.5
      };
    });

    const top = scored.sort((a, b) => b.score - a.score).slice(0, 10);
    const reservationToken = createReservationToken({
      top,
      createdBy: req.user?.id || null
    });

    // Set reservation token in secure HTTP-only cookie
res.cookie('reservationToken', reservationToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 10 * 60 * 1000 // expires in 10 minutes
});

    return res
      .status(200)
      .json(new ApiResponse(200, { top}, 'AI slot recommendations'));
  } catch (err) {
    console.error('AI Scheduler call failed:', err?.response?.data || err.message);
    const top = candidates.map(c => ({ ...c, score: 0.5 })).slice(0, 10);
    const reservationToken = createReservationToken({ top, createdBy: req.user?.id || null });

    // Set reservation token in secure HTTP-only cookie
res.cookie('reservationToken', reservationToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 10 * 60 * 1000 // expires in 10 minutes
});


    return res
      .status(200)
      .json(new ApiResponse(200, { top}, 'Fallback recommendations'));
  }
});

// POST /api/sessions/confirm
// body: { reservationToken, candidateIndex } OR full payload { practitionerId, start, durationMinutes, therapyType, centerId }
export const confirmBooking = asyncHandler(async (req, res) => {
  const patientId = req.user && req.user.id;
  if (!patientId) throw new ApiError(401, 'Login required');

  let practitionerId, startISO, durationMinutes, therapyType, centerId;

  const reservationToken = req.cookies?.reservationToken;
if (reservationToken) {
  const payload = getReservation(reservationToken);
    if (!payload) throw new ApiError(410, 'Reservation expired or invalid');
    const idx = Number(req.body.candidateIndex) || 0;
    const candidate = payload.top && payload.top[idx];
    if (!candidate) throw new ApiError(400, 'Invalid candidate index');
    practitionerId = candidate.practitionerId;
    startISO = candidate.start;
    durationMinutes = candidate.durationMinutes;
    centerId = candidate.centerId;
    // optional therapyType if candidate has it
    therapyType = candidate.therapyType;
    // delete reservation to avoid double-book
    deleteReservation(req.body.reservationToken);
  } else {
    ({ practitionerId, startISO, durationMinutes, therapyType, centerId } = req.body);
    if (!practitionerId || !startISO) throw new ApiError(400, 'Missing required fields');
  }

  const start = new Date(startISO);
  const end = new Date(start.getTime() + (durationMinutes || 60) * 60000);

  // Final conflict check (atomic enough for our level)
  const conflict = await hasConflict(practitionerId, start, end);
  if (conflict) throw new ApiError(409, 'Slot no longer available');

  // Create session
  const session = await Session.create({
    patientId,
    practitionerId,
    therapyType,
    centerId,
    scheduledStart: start,
    scheduledEnd: end,
    durationMinutes: durationMinutes || 60,
    status: 'booked',
    createdBy: 'Patient' // or 'AI' if reservation came from AI
  });

  await AuditLog.create({
    userId: patientId,
    userModel: 'Patient',
    centerId: centerId,
    action: 'create', 
    resourceType: 'Session', 
    resourceId: session._id,
    description: 'Booked session (via AI)'
  });

  // Notifications
  await Notification.insertMany([
    { userId: patientId, userModel: 'Patient', title: 'Booking confirmed', message: `Your session is at ${start.toISOString()}`, type: 'booking_confirmation' },
    { userId: practitionerId, userModel: 'Practitioner', title: 'New session assigned', message: `New session at ${start.toISOString()}`, type: 'booking_confirmation' }
  ]);

  return res.status(201).json(new ApiResponse(201, session, 'Session confirmed'));
});

// GET /api/sessions/:id
export const getSession = asyncHandler(async (req, res) => {
  const id = req.params.Id;
  const s = await Session.findById(id).populate('patientId practitionerId');
  if (!s) throw new ApiError(404, 'Session not found');

  // permission checks: patient can view own, practitioner own, admin center-wide
  if (req.user.role === 'patient' && s.patientId._id.toString() !== req.user.id) throw new ApiError(403, 'Forbidden');
  if (req.user.role === 'practitioner' && s.practitionerId._id.toString() !== req.user.id) throw new ApiError(403, 'Forbidden');

  return res.status(200).json(new ApiResponse(200, s));
});

// GET /api/sessions  (admin - filterable)
export const listSessions = asyncHandler(async (req, res) => {
  const { start, end, practitionerId, patientId, status, page = 1, limit = 50 } = req.query;
  const filter = {centerId:req.user.centerId};
  if (start || end) filter.scheduledStart = {};
  if (start) filter.scheduledStart.$gte = new Date(start);
  if (end) filter.scheduledStart.$lte = new Date(end);
  if (practitionerId) filter.practitionerId = practitionerId;
  if (patientId) filter.patientId = patientId;
  
  if (status) filter.status = status;

  // If not admin, restrict: practitioner -> own sessions; patient -> own sessions
  if (req.user.role === 'practitioner') filter.practitionerId = req.user.id;
  if (req.user.role === 'patient') filter.patientId = req.user.id;

  const sessions = await Session.find(filter)
    .populate('patientId practitionerId')
    .sort({ scheduledStart: 1 })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  const total = await Session.countDocuments(filter);
  res.status(200).json(new ApiResponse(200, { sessions, total }));
});

// POST /api/sessions/:id/cancel (patient or admin)
export const cancelSession = asyncHandler(async (req, res) => {
  const sessionId = req.params.Id;
  const session = await Session.findById(sessionId);
  if (!session) throw new ApiError(404, 'Session not found');

  // permission: patient-owner or admin
  if (req.user.role === 'patient' && session.patientId.toString() !== req.user.id) throw new ApiError(403, 'Forbidden');

  session.status = 'cancelled';
  session.cancelReason = req.body?.reason || 'Cancelled';
  session.cancelledBy = req.user.id;
  session.cancelledAt = new Date();
  await session.save();

  await AuditLog.create({
    userId: req.user.id, 
    userModel: req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1),
    action: 'cancel', 
    resourceType: 'Session', 
    resourceId: session._id, 
    description: 'Session cancelled',
    centerId: session.centerId,
  });

  // notify both sides
  await Notification.insertMany([
    { userId: session.patientId, userModel: 'Patient', title: 'Session cancelled', message: `Session cancelled`, type: 'cancellation' },
    { userId: session.practitionerId, userModel: 'Practitioner', title: 'Session cancelled', message: `Session cancelled`, type: 'cancellation' }
  ]);

  res.status(200).json(new ApiResponse(200, session, 'Cancelled'));
});

// Admin-only: POST /api/sessions/force (force-book)
export const forceBookSession = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') throw new ApiError(403, 'Admin only');
  const { patientEmail, practitionerEmail, startISO, durationMinutes = 60, therapyType } = req.body;
  
    const patient = await Patient.findOne({ email:patientEmail });
    const practitioner = await Practitioner.findOne({ email:practitionerEmail });
      console.log(patient, practitioner)
  
    if (!patient || !practitioner) throw new ApiError(404, 'Both patient and practitioner must exist');

    const patientId = patient._id;
    const practitionerId = practitioner._id;
  
  const centerId = req.user.centerId;
  if (!patientId || !practitionerId || !startISO) throw new ApiError(400, 'Missing required fields');

  const start = new Date(startISO);
  const end = new Date(start.getTime() + (durationMinutes) * 60000);

  // Admin override: optionally skip conflict check, but we still warn if there is a conflict
  const conflict = await Session.findOne({
    practitionerId,
    scheduledStart: { $lt: end },
    scheduledEnd: { $gt: start },
    status: { $in: ['booked', 'confirmed', 'rescheduled'] }
  }).lean();

  // Create session regardless (force)
  const session = await Session.create({
    patientId, practitionerId, centerId, therapyType, scheduledStart: start, scheduledEnd: end, durationMinutes, status: 'confirmed', createdBy: 'Admin'
  });

  await AuditLog.create({
    userId: req.user.id, 
    userModel: 'Admin', 
    action: 'create', 
    resourceType: 'Session', 
    resourceId: session._id, 
    centerId: centerId,
    description: 'Force confirmed session', 
    details: { conflict: !!conflict }
  });

  await Notification.insertMany([
    { userId: patientId, userModel: 'Patient',type:'session_confirmation', title: 'Session confirmed by admin', message: `Session at ${start.toISOString()}` },
    { userId: practitionerId, userModel: 'Practitioner',type:'session_confirmation' ,title:'Session assigned (admin)', message: `Session at ${start.toISOString()}` }
  ]);


  return res.status(201).json(new ApiResponse(201, { session, conflict: !!conflict }, 'Force confirmed'));
});


// Admin-only: POST /api/sessions/:id/reassign
export const reassignPractitioner = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') throw new ApiError(403, 'Admin only');
  const sessionId = req.params.Id;

  const { newPractitionerEmail } = req.body;
  const newPractitionerId = await Practitioner.findOne({ email:newPractitionerEmail });


  const session = await Session.findById(sessionId);
  if (!session) throw new ApiError(404, 'Session not found');

  const prev = session.practitionerId;
  session.practitionerId = newPractitionerId;
  await session.save();

  await AuditLog.create({
    userId: req.user.id, 
    userModel: 'Admin', 
    action: 'update', 
    centerId: session.centerId,
    resourceType: 'Session', 
    resourceId: session._id, 
    description: 'Reassigned practitioner', 
    details: { from: prev, to: newPractitionerId }
  });

  // notify previous and new practitioner + patient
  await Notification.insertMany([
    { userId: prev, userModel: 'Practitioner',type:"session_reminder", title: 'Session reassigned', message: `A session has been reassigned` },
    { userId: newPractitionerId, userModel: 'Practitioner',type:"session_reminder", title: 'New session assigned', message: `You have been assigned a session` },
    { userId: session.patientId, userModel: 'Patient',type:"session_reminder", title: 'Practitioner reassigned', message: `Your session practitioner was changed` }
  ]);

  res.status(200).json(new ApiResponse(200, session, 'Reassigned'));
});
