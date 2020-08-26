const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.sendNotificationToTopic = functions.firestore.document('notification/{mUid}').onWrite(async (event) => {

    const title = event.after.get('title');
    const body = event.after.get('description');
    // const data = event.after.get('dates');

    var message = {
        notification: {
            title: `Nueva tarea: ${title}`,
            body: body
        },
        topic: 'medical',
    }

    return admin.messaging().send(message);
});

exports.sendNotificationToTopicComments = functions.firestore.document('comments/{mUid}').onWrite(async (event) => {
    const body = event.after.get('comment');
    const name = event.after.get('nameUser');
    const solit = event.after.get('solit');
    // const idPost = event.after.get('idPost')
    var message = {
        notification: {
            title: `${name} - ${LIST.data().title}`,
            body: solit ? `Nueva solicitud: ${body}` : `Nuevo comentario: ${body}`
        },
        topic: 'medical',
    }
    return admin.messaging().send(message);

});

