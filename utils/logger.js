// utils/logger.js — simple logger utility for consistent formatting

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function timestamp() {
  return new Date().toISOString();
}

const logger = {
  info: (module, message) => {
    console.log(
      `${colors.cyan}[${timestamp()}]${colors.reset} ${colors.blue}[${module}]${colors.reset} ℹ️  ${message}`
    );
  },

  success: (module, message) => {
    console.log(
      `${colors.cyan}[${timestamp()}]${colors.reset} ${colors.green}[${module}]${colors.reset} ✅ ${message}`
    );
  },

  warn: (module, message) => {
    console.log(
      `${colors.cyan}[${timestamp()}]${colors.reset} ${colors.yellow}[${module}]${colors.reset} ⚠️  ${message}`
    );
  },

  error: (module, message, err = null) => {
    console.error(
      `${colors.cyan}[${timestamp()}]${colors.reset} ${colors.red}[${module}]${colors.reset} ❌ ${message}`
    );
    if (err) {
      console.error(`${colors.red}${err.stack}${colors.reset}`);
    }
  },
};

module.exports = logger;
