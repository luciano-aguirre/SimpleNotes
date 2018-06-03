'use strict';

import Realm from 'realm';

class Note extends Realm.Object {}
Note.schema = {
    name: 'Note',
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: 'string', 
        description: 'string', 
        privated: 'bool',
        creationDate: 'date'
    }
};

export default new Realm({schema: [Note], schemaVersion: 2});
