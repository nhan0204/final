/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/medita.json`.
 */
export type Medita = {
  "address": "3wNGqd1kUQEooWZ5QpNeZVRnxvy8DETgzyCM9bqaDWLb",
  "metadata": {
    "name": "medita",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createPatient",
      "discriminator": [
        176,
        85,
        210,
        156,
        179,
        74,
        60,
        203
      ],
      "accounts": [
        {
          "name": "patientInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "insuranceId"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "insuranceId",
          "type": "string"
        },
        {
          "name": "lastName",
          "type": "string"
        },
        {
          "name": "firstName",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "phoneNumber",
          "type": "string"
        },
        {
          "name": "address",
          "type": "string"
        }
      ]
    },
    {
      "name": "deletePatient",
      "discriminator": [
        24,
        78,
        5,
        76,
        75,
        220,
        61,
        15
      ],
      "accounts": [
        {
          "name": "patientInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "insuranceId"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "insuranceId",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatePatient",
      "discriminator": [
        112,
        151,
        255,
        60,
        59,
        88,
        232,
        154
      ],
      "accounts": [
        {
          "name": "patientInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "insuranceId"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "insuranceId",
          "type": "string"
        },
        {
          "name": "lastName",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "firstName",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "email",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "phoneNumber",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "address",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "disease",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "prescription",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "patientInfo",
      "discriminator": [
        243,
        72,
        195,
        113,
        27,
        242,
        154,
        14
      ]
    }
  ],
  "types": [
    {
      "name": "patientInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "lastName",
            "type": "string"
          },
          {
            "name": "firstName",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "phoneNumber",
            "type": "string"
          },
          {
            "name": "address",
            "type": "string"
          },
          {
            "name": "insuranceId",
            "type": "string"
          },
          {
            "name": "disease",
            "type": "string"
          },
          {
            "name": "prescription",
            "type": "string"
          }
        ]
      }
    }
  ]
};
