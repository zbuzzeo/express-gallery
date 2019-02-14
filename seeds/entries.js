
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        { 
          id: 1, 
          author: 'zbuzzeo',
          link: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          description: 'entrance music temple, Indonesia'
        },
        { 
          id: 2,
          author: 'zbuzzeo',
          link: 'https://images.unsplash.com/photo-1431069767777-c37892aa0a07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80',
          description: 'guitar plugged in Ibanez guitar amplifier'
        },
        { 
          id: 3,
          author: 'zbuzzeo',
          link: 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          description: 'shallow depth of field photo of turntable',
        },
        { 
          id: 4, 
          author: 'zbuzzeo',
          link: 'https://images.unsplash.com/photo-1524230659092-07f99a75c013?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          description: 'person playing drums',
        },
        { 
          id: 5, 
          author: 'zbuzzeo',
          link: 'https://images.unsplash.com/photo-1465661910194-fd1393a57d24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1866&q=80',
          description: 'person playing acoustic guitar',
        },
        { 
          id: 6, 
          author: 'zbuzzeo',
          link: 'https://images.unsplash.com/photo-1493235431945-90c060301e41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          description: 'black Android smartphone beside MacBook Pro on top of brown table',
        },
        {
          id: 7,
          author: 'zbuzzeo',
          link: 'https://images.unsplash.com/photo-1481886756534-97af88ccb438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
          description: 'band practicing in studio',
        }
      ]);
    });
};
