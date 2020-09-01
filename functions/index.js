const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.sendNotificationToTopic = functions.firestore.document('list/{mUid}').onWrite(async (event) => {

    const title = event.after.get('title');
    const body = event.after.get('description');
    // const data = event.after.get('dates');

    var message = {
        notification: {
            title: title === undefined ? 'Tarea eliminada' : `Nueva tarea: ${title}`,
            body: title === undefined ? 'Tarea eliminada' : body
        },
        topic: 'medical',
    }

    return admin.messaging().send(message);
});

exports.sendNotificationToTopicComments = functions.firestore.document('comments/{mUid}').onWrite(async (event) => {
    const body = event.after.get('comment');
    const solit = event.after.get('solit');
    var message = {
        notification: {
            title: `Nuevo comentario`,
            body: solit ? `Nueva solicitud: ${body}` : `Nuevo comentario: ${body}`
        },
        topic: 'medical',
    }
    return admin.messaging().send(message);

});

