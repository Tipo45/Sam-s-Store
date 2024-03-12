/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5l8kdhpo3gkpb0c",
    "created": "2024-03-10 22:44:33.964Z",
    "updated": "2024-03-10 22:44:33.964Z",
    "name": "store_users",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bquvysda",
        "name": "cart",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "jk8amxsm",
        "name": "billing_information",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5l8kdhpo3gkpb0c");

  return dao.deleteCollection(collection);
})
