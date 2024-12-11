
// Basic Project Configuration
// see  the docs for more info: https://docs.basic.tech
export const config = {
  name: "basictodoreact",
  project_id: "289dd339-cdcf-43ff-85ad-978bd9833b60"
};

export const schema = {
		"project_id": "289dd339-cdcf-43ff-85ad-978bd9833b60",
		"tables": {
			"todos": {
				"fields": {
					"completed": {
						"indexed": true,
						"type": "boolean"
					},
					"date": {
						"indexed": true,
						"type": "string"
					},
					"id": {
						"indexed": true,
						"type": "string"
					},
					"title": {
						"indexed": true,
						"type": "string"
					}
				},
				"type": "collection"
			}
		},
		"version": 5
	};
