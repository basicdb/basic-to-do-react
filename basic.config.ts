export const schema = {
  "project_id": "289dd339-cdcf-43ff-85ad-978bd9833b60",
  "version": 0,
  "tables": {
    "lists": {
      "type": "collection",
      "fields": {
        "title": {
          "type": "string",
          "indexed": true
        }
      }
    },
    "todos": {
      "type": "collection",
      "fields": {
        "id": {
          "type": "string",
          "indexed": true
        },
        "title": {
          "type": "string",
          "indexed": true
        },
        "date": {
          "type": "date",
          "indexed": true
        },
        "completed": {
          "type": "boolean",
          "indexed": true
        },
        "tags": {
          "type": "array",
          "indexed": true
        }
      }
    }
  }
}