// utils/constants.js — centralized configuration and magic strings
// Reduces typos and makes IDs easier to update

module.exports = {
  // Discord Role IDs
  ROLES: {
    STAFF: process.env.STAFF_ROLE_ID || "1455324349526442099",
    OWNERSHIP: process.env.OWNERSHIP_ROLE_ID || "1455323928602873919",
  },

  // Discord Channel/Category IDs
  CHANNELS: {
    TICKET_CATEGORY: process.env.TICKET_CATEGORY_ID || "YOUR_TICKET_CATEGORY_ID",
    LOG: process.env.LOG_CHANNEL_ID || "YOUR_LOG_CHANNEL_ID",
  },

  // Support System
  SUPPORT: {
    BUTTON_IDS: {
      CLAIM: "support_claim",
      CLOSE: "support_close",
    },
    MENU_IDS: {
      TYPE: "support_type_menu",
    },
    TICKET_TTL: 24 * 60 * 60 * 1000, // 24 hours
    AUTO_CLOSE_INACTIVE: 24 * 60 * 60 * 1000, // 24 hours
  },

  // Giveaway System
  GIVEAWAY: {
    BUTTON_PREFIX: "giveaway_join_",
    TITLE_MAX_LENGTH: 100,
    PRIZE_MAX_LENGTH: 256,
  },

  // Session Links
  SESSION: {
    LINK_TTL: 24 * 60 * 60 * 1000, // 24 hours
    CLEANUP_INTERVAL: 60 * 60 * 1000, // 1 hour
  },

  // Cooldowns (in seconds)
  COOLDOWNS: {
    WORK: 3,
    WITHDRAW: 3,
    DEPOSIT: 3,
    GIVEAWAY_JOIN: 2,
  },

  // Colors (Hex)
  COLORS: {
    PRIMARY: 0x89cff0, // Baby blue
    SUCCESS: 0x57f287, // Green
    ERROR: 0xed4245, // Red
    WARNING: 0xfee75c, // Yellow
  },

  // Ticket Types
  TICKET_TYPES: {
    general: {
      label: "General Assistance",
      color: 0x5865f2,
      prefix: "general",
      pingStaff: false,
      description:
        "Use this ticket to ask questions about rules or sessions. You may also use this ticket to Request Partnerships, Claim Perks, or for Application Requests.",
    },
    civilian: {
      label: "Civilian Report",
      color: 0xed4245,
      prefix: "report",
      pingStaff: true,
      description:
        "Use this to report a Civilian who might be breaking the rules. Make sure to gather proof as it is necessary.",
    },
    staff: {
      label: "Staff Report",
      color: 0xfee75c,
      prefix: "staff",
      pingStaff: true,
      description:
        "Use this to report a Staff Member who might be breaking the rules. Make sure to gather proof as it is necessary.",
    },
  },

  // Validation
  VALIDATION: {
    USERNAME_MAX_LENGTH: 32,
    CHANNEL_NAME_MAX_LENGTH: 100,
    DESCRIPTION_MAX_LENGTH: 2000,
  },
};
