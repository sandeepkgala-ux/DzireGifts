/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "select1809393930",
    "maxSelect": 0,
    "name": "renderType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "3d-raised-gold",
      "engraved-burn",
      "interconnected-cut",
      "Printed"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "select1809393930",
    "maxSelect": 0,
    "name": "renderType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "3d-raised-gold",
      "engraved-burn",
      "interconnected-cut"
    ]
  }))

  return app.save(collection)
})
