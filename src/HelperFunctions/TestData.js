export default {
  drivers: [
    {
      id: 1,
      full_name: "William Bradley",
      pay_rate: "0.36",
      equipment: { id: 1, unit_num: "101", status: "active" },
      status: "active"
    },
    {
      id: 2,
      full_name: "David Richards",
      pay_rate: "0.42",
      equipment: { id: 2, unit_num: "102", status: "active" },
      status: "active"
    },
    {
      id: 3,
      full_name: "Pros Savath",
      pay_rate: "0.45",
      equipment: { id: 3, unit_num: "103", status: "active" },
      status: "active"
    },
    {
      id: 5,
      full_name: "Brian Lewis",
      pay_rate: "0.42",
      equipment: { id: 5, unit_num: "105", status: "active" },
      status: "active"
    },
    {
      id: 6,
      full_name: "Albert Placeres",
      pay_rate: "0.43",
      equipment: { id: 6, unit_num: "106", status: "active" },
      status: "active"
    },
    {
      id: 4,
      full_name: "John Kennedy",
      pay_rate: "0.42",
      equipment: {},
      status: "inactive"
    },
    {
      id: 16,
      full_name: "Nickie Connery",
      pay_rate: "0.00",
      equipment: {},
      status: "inactive"
    },
    {
      id: 15,
      full_name: "Katrina Guth",
      pay_rate: "0.00",
      equipment: {},
      status: "inactive"
    },
    {
      id: 9,
      full_name: "Timothy Squires",
      pay_rate: "0.40",
      equipment: {},
      status: "active"
    }
  ],
  equipments: [
    {
      id: 1,
      unit_num: "101",
      status: "active",
      driver: {
        id: 1,
        full_name: "William Bradley",
        pay_rate: "0.36",
        status: "active"
      }
    },
    {
      id: 2,
      unit_num: "102",
      status: "active",
      driver: {
        id: 2,
        full_name: "David Richards",
        pay_rate: "0.42",
        status: "active"
      }
    },
    {
      id: 3,
      unit_num: "103",
      status: "active",
      driver: {
        id: 3,
        full_name: "Pros Savath",
        pay_rate: "0.45",
        status: "active"
      }
    },
    {
      id: 4,
      unit_num: "104",
      status: "active",
      driver: { full_name: "", pay_rate: "" }
    },
    {
      id: 5,
      unit_num: "105",
      status: "active",
      driver: {
        id: 5,
        full_name: "Brian Lewis",
        pay_rate: "0.42",
        status: "active"
      }
    },
    {
      id: 6,
      unit_num: "106",
      status: "active",
      driver: {
        id: 6,
        full_name: "Albert Placeres",
        pay_rate: "0.43",
        status: "active"
      }
    },
    {
      id: 13,
      unit_num: "1001",
      status: "inactive",
      driver: { full_name: "", pay_rate: "" }
    },
    {
      id: 15,
      unit_num: "3333",
      status: "inactive",
      driver: { full_name: "", pay_rate: "" }
    }
  ],
  idleDrivers: [
    {
      id: 2,
      full_name: "David Richards",
      pay_rate: "0.42",
      status: "active",
      equipment: { id: 2, unit_num: "102", status: "active" }
    },
    {
      id: 5,
      full_name: "Brian Lewis",
      pay_rate: "0.42",
      status: "active",
      equipment: { id: 5, unit_num: "105", status: "active" }
    },
    {
      id: 9,
      full_name: "Timothy Squires",
      pay_rate: "0.40",
      status: "active",
      equipment: {}
    }
  ],
  idleEquipments: [
    { id: 2, unit_num: "102", status: "active" },
    { id: 5, unit_num: "105", status: "active" }
  ],
  loggedInCarrier: [
    {
      username: "romiaujla",
      full_name: "ramanpreet singh aujla",
      company_name: "aujla star transport llc",
      mc_num: "968302"
    }
  ],
  shipments: [
    {
      id: 10,
      rate: "2100.00",
      status: "completed",
      miles: "135",
      broker: "JB Hunt",
      driver: {
        id: 5,
        full_name: "Brian Lewis",
        pay_rate: 0.42,
        status: "active"
      },
      equipment: { id: 5, unit_num: "105", status: "active" },
      pickup_date: "10/20/2019",
      pickup_warehouse: { id: 6, city: "Dover", state: "DE", zipcode: "19902" },
      delivery_date: "11/7/2019",
      delivery_warehouse: {
        id: 2,
        city: "Greenwood",
        state: "IN",
        zipcode: "46143"
      }
    },
    {
      id: 5,
      rate: "2400.00",
      status: "completed",
      miles: "1016",
      broker: "R&R Express",
      driver: {
        id: 4,
        full_name: "John Kennedy",
        pay_rate: 0.42,
        status: "inactive"
      },
      equipment: {},
      pickup_date: "11/7/2019",
      pickup_warehouse: {
        id: 7,
        city: "Washington",
        state: "DC",
        zipcode: "20020"
      },
      delivery_date: "11/8/2019",
      delivery_warehouse: {
        id: 5,
        city: "Greenwood",
        state: "IN",
        zipcode: "46142"
      }
    },
    {
      id: 9,
      rate: "2000.00",
      status: "unloading",
      miles: "15",
      broker: "Crowley Logistics",
      driver: {
        id: 3,
        full_name: "Pros Savath",
        pay_rate: 0.45,
        status: "active"
      },
      equipment: { id: 3, unit_num: "103", status: "active" },
      pickup_date: "11/7/2019",
      pickup_warehouse: {
        id: 11,
        city: "Beverly Hills",
        state: "CA",
        zipcode: "90209"
      },
      delivery_date: "11/8/2019",
      delivery_warehouse: {
        id: 5,
        city: "Greenwood",
        state: "IN",
        zipcode: "46142"
      }
    },
    {
      id: 12,
      rate: "2100.00",
      status: "completed",
      miles: "1011",
      broker: "CH Robinson",
      driver: {
        id: 2,
        full_name: "David Richards",
        pay_rate: 0.42,
        status: "active"
      },
      equipment: { id: 2, unit_num: "102", status: "active" },
      pickup_date: "11/2/2019",
      pickup_warehouse: {
        id: 13,
        city: "Orlando",
        state: "FL",
        zipcode: "32801"
      },
      delivery_date: "11/4/2019",
      delivery_warehouse: {
        id: 5,
        city: "Greenwood",
        state: "IN",
        zipcode: "46142"
      }
    },
    {
      id: 8,
      rate: "1300.00",
      status: "completed",
      miles: "635",
      broker: "JB Hunt",
      driver: {
        id: 6,
        full_name: "Albert Placeres",
        pay_rate: 0.43,
        status: "active"
      },
      equipment: { id: 6, unit_num: "106", status: "active" },
      pickup_date: "11/7/2019",
      pickup_warehouse: {
        id: 17,
        city: "Des Moines",
        state: "IA",
        zipcode: "50301"
      },
      delivery_date: "11/8/2019",
      delivery_warehouse: {
        id: 13,
        city: "Orlando",
        state: "FL",
        zipcode: "32801"
      }
    },
    {
      id: 13,
      rate: "900.00",
      status: "completed",
      miles: "126",
      broker: "Yellow Transportation",
      driver: {
        id: 6,
        full_name: "Albert Placeres",
        pay_rate: 0.43,
        status: "active"
      },
      equipment: { id: 6, unit_num: "106", status: "active" },
      pickup_date: "11/4/2019",
      pickup_warehouse: {
        id: 17,
        city: "Des Moines",
        state: "IA",
        zipcode: "50301"
      },
      delivery_date: "11/6/2019",
      delivery_warehouse: {
        id: 16,
        city: "Springfield",
        state: "IL",
        zipcode: "62701"
      }
    },
    {
      id: 11,
      rate: "2300.00",
      status: "completed",
      miles: "602",
      broker: "JB Hunt",
      driver: {
        id: 1,
        full_name: "William Bradley",
        pay_rate: 0.36,
        status: "active"
      },
      equipment: { id: 1, unit_num: "101", status: "active" },
      pickup_date: "11/2/2019",
      pickup_warehouse: {
        id: 17,
        city: "Des Moines",
        state: "IA",
        zipcode: "50301"
      },
      delivery_date: "11/4/2019",
      delivery_warehouse: {
        id: 23,
        city: "Avenel",
        state: "NJ",
        zipcode: "07001"
      }
    },
    {
      id: 4,
      rate: "800.00",
      status: "completed",
      miles: "211",
      broker: "TQL",
      driver: {
        id: 1,
        full_name: "William Bradley",
        pay_rate: 0.36,
        status: "active"
      },
      equipment: { id: 1, unit_num: "101", status: "active" },
      pickup_date: "11/7/2019",
      pickup_warehouse: {
        id: 18,
        city: "Wichita",
        state: "KS",
        zipcode: "67201"
      },
      delivery_date: "11/8/2019",
      delivery_warehouse: {
        id: 22,
        city: "Carteret",
        state: "NJ",
        zipcode: "07006"
      }
    },
    {
      id: 3,
      rate: "700.00",
      status: "in transit",
      miles: "565",
      broker: "CH Robinson",
      driver: {
        id: 1,
        full_name: "William Bradley",
        pay_rate: 0.36,
        status: "active"
      },
      equipment: { id: 1, unit_num: "101", status: "active" },
      pickup_date: "11/7/2019",
      pickup_warehouse: {
        id: 2,
        city: "Greenwood",
        state: "IN",
        zipcode: "46143"
      },
      delivery_date: "11/8/2019",
      delivery_warehouse: {
        id: 9,
        city: "Sacramento",
        state: "CA",
        zipcode: "92403"
      }
    },
    {
      id: 1,
      rate: "1200.00",
      status: "dispatched",
      miles: "280",
      broker: "CH Robinson",
      driver: {
        id: 6,
        full_name: "Albert Placeres",
        pay_rate: 0.43,
        status: "active"
      },
      equipment: { id: 6, unit_num: "106", status: "active" },
      pickup_date: "11/1/2019",
      pickup_warehouse: {
        id: 2,
        city: "Greenwood",
        state: "IN",
        zipcode: "46143"
      },
      delivery_date: "11/1/2019",
      delivery_warehouse: {
        id: 3,
        city: "Canton",
        state: "MI",
        zipcode: "48187"
      }
    }
  ]
};
