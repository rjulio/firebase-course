/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
// const logger = require("firebase-functions/logger");
const createUserApp = require('./create-user');
const {onRequest} = require("firebase-functions/v2/https");

exports.onAddCourseUpdatePromoCounter = functions.runWith({
  timeoutSeconds: 300,
  memory: "128MB"
}).firestore.document('courses/{courseId}')
  .onCreate(async (snap, context) => {
    await (
      await import('./promotions-counter/on-add-course.js'))
      .addCounter(snap, context);
  });

exports.onCourseUpdatedUpdatePromoCounter = functions.firestore.document('courses/{courseId}')
  .onUpdate(async (change, context) => {
    await(
      await import('./promotions-counter/on-course-update.js'))
        .courseUpdate(change, context);
  });

exports.onCourseDeleteUpdatePromoCounter = functions.firestore.document('courses/{courseId}')
  .onDelete(async (snap, context) => {
    await(
      await import('./promotions-counter/on-course-delete.js'))
        .courseDelete(snap, context);
  });

exports.createUserApp = onRequest({cors: ['http://localhost:4200']}, createUserApp);