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

class UserConfig extends Realm.Object {}
UserConfig.schema = {
    name: 'UserConfig',
    primaryKey: 'id',
    properties: {
        id: 'int',
        password: 'string'
    }
};

export default new Realm({schema: [Note, UserConfig], schemaVersion: 3});
