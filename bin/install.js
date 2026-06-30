#!/usr/bin/env node

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const PACKAGE_NAME = "fastmoss-skills";
const MCP_GUIDE_URL = "https://developers.fastmoss.com/mcp/overview.html";
const PAYLOAD_ENTRIES = [
  "SKILL.md",
  "references",
  "README.md",
  "README.zh-CN.md",
  "LICENSE",
];

function usage() {
  return [
    "FastMoss Skills installer",
    "",
    "Usage:",
    "  fastmoss-skills install --dest <AI_CLIENT_SKILLS_DIR> [--force]",
    "  AI_SKILLS_DIR=<AI_CLIENT_SKILLS_DIR> fastmoss-skills install [--force]",
    "",
    "Options:",
    "  --dest <dir>   Directory that contains AI client skill folders.",
    "  --force        Replace an existing fastmoss-skills installation.",
    "  -h, --help     Show this help message.",
  ].join("\n");
}

function parseArgs(argv) {
  const args = [...argv];
  const command = args[0] && !args[0].startsWith("-") ? args.shift() : "install";
  const options = {
    command,
    dest: undefined,
    force: false,
    help: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "-h" || arg === "--help") {
      options.help = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--dest") {
      options.dest = args[i + 1];
      i += 1;
    } else if (arg.startsWith("--dest=")) {
      options.dest = arg.slice("--dest=".length);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function expandHome(inputPath) {
  if (!inputPath) {
    return inputPath;
  }
  if (inputPath === "~") {
    return os.homedir();
  }
  if (inputPath.startsWith(`~${path.sep}`)) {
    return path.join(os.homedir(), inputPath.slice(2));
  }
  return inputPath;
}

function copyPayload(sourceRoot, targetRoot) {
  for (const entry of PAYLOAD_ENTRIES) {
    const source = path.join(sourceRoot, entry);
    if (!fs.existsSync(source)) {
      throw new Error(`Package payload is missing: ${entry}`);
    }

    fs.cpSync(source, path.join(targetRoot, entry), {
      recursive: true,
      dereference: false,
    });
  }
}

function install(options, env = process.env) {
  const destFromEnv = env.AI_SKILLS_DIR;
  const dest = options.dest || destFromEnv;
  if (!dest) {
    throw new Error("Missing destination. Pass --dest <dir> or set AI_SKILLS_DIR.");
  }

  const sourceRoot = path.resolve(__dirname, "..");
  const skillsDir = path.resolve(expandHome(dest));
  const targetRoot = path.join(skillsDir, PACKAGE_NAME);

  if (fs.existsSync(targetRoot)) {
    if (!options.force) {
      throw new Error(`Installation already exists: ${targetRoot}. Re-run with --force to replace it.`);
    }
    fs.rmSync(targetRoot, { recursive: true, force: true });
  }

  fs.mkdirSync(skillsDir, { recursive: true });
  fs.mkdirSync(targetRoot, { recursive: true });
  copyPayload(sourceRoot, targetRoot);

  return targetRoot;
}

function main(argv = process.argv.slice(2)) {
  try {
    const options = parseArgs(argv);
    if (options.help) {
      console.log(usage());
      return 0;
    }
    if (options.command !== "install") {
      throw new Error(`Unknown command: ${options.command}`);
    }

    const targetRoot = install(options);
    console.log(`Installed FastMoss Skills to ${targetRoot}`);
    console.log(`FastMoss MCP is required for live data. Setup guide: ${MCP_GUIDE_URL}`);
    return 0;
  } catch (error) {
    console.error(error.message);
    console.error("");
    console.error(usage());
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main();
}

module.exports = {
  install,
  parseArgs,
  usage,
};
