const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

const rootDir = path.resolve(__dirname, "..");
const cliPath = path.join(rootDir, "bin", "install.js");

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "fastmoss-skills-test-"));
}

function runCli(args, options = {}) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: rootDir,
    encoding: "utf8",
    env: { ...process.env, ...options.env },
  });
}

function installedPath(dest) {
  return path.join(dest, "fastmoss-skills");
}

test("installs the skill payload into the requested skills directory", () => {
  const dest = makeTempDir();

  const result = runCli(["install", "--dest", dest]);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.ok(fs.existsSync(path.join(installedPath(dest), "SKILL.md")));
  assert.ok(fs.existsSync(path.join(installedPath(dest), "README.md")));
  assert.ok(fs.existsSync(path.join(installedPath(dest), "README.zh-CN.md")));
  assert.ok(fs.existsSync(path.join(installedPath(dest), "LICENSE")));
  assert.ok(fs.existsSync(path.join(installedPath(dest), "references", "PRINCIPLES.md")));
  assert.ok(fs.existsSync(path.join(installedPath(dest), "references", "GLOSSARY.md")));
});

test("refuses to overwrite an existing installation unless force is set", () => {
  const dest = makeTempDir();
  const existing = installedPath(dest);
  fs.mkdirSync(existing, { recursive: true });
  fs.writeFileSync(path.join(existing, "marker.txt"), "keep");

  const result = runCli(["install", "--dest", dest]);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /already exists/i);
  assert.equal(fs.readFileSync(path.join(existing, "marker.txt"), "utf8"), "keep");
});

test("force overwrites an existing installation", () => {
  const dest = makeTempDir();
  const existing = installedPath(dest);
  fs.mkdirSync(existing, { recursive: true });
  fs.writeFileSync(path.join(existing, "marker.txt"), "replace");

  const result = runCli(["install", "--dest", dest, "--force"]);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.ok(fs.existsSync(path.join(existing, "SKILL.md")));
  assert.equal(fs.existsSync(path.join(existing, "marker.txt")), false);
});

test("uses AI_SKILLS_DIR when dest is omitted", () => {
  const dest = makeTempDir();

  const result = runCli(["install"], { env: { AI_SKILLS_DIR: dest } });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.ok(fs.existsSync(path.join(installedPath(dest), "SKILL.md")));
});

test("uses a known client preset when client is provided", () => {
  const home = makeTempDir();

  const result = runCli(["install", "--client", "claude"], { env: { HOME: home } });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.ok(fs.existsSync(path.join(home, ".claude", "skills", "fastmoss-skills", "SKILL.md")));
});

test("prints quick install examples when destination is missing", () => {
  const result = runCli(["install"], { env: { AI_SKILLS_DIR: "", HOME: makeTempDir() } });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Quick install examples/i);
  assert.match(result.stderr, /--client claude/i);
});
