const { db } =  require('../init');
const { FieldValue } = require('firebase-admin/firestore');

const addCounter = async (snapshot, context) => {
  const course = snapshot.data();
  if (course.promo) {
    return db.doc('courses/stats').update({
      totalPromo: FieldValue.increment(1)
    });
    // return db.runTransaction(async (transaction) => {
    //   const counterRef = db.doc('courses/  stats');
    //   const snap = await transaction.get(counterRef);
    //   const stats = snap.data() ?? { totalPromo: 0 };
    //   stats.totalPromo += 1;

    //   transaction.set(counterRef, stats);
    // });
  }
};

module.exports = { addCounter };