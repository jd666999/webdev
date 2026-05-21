import { db } from "../db.js";
import { createUser } from "../models/users.js";
import { registerInterest } from "../models/interest.js";

// ─── Staff ────────────────────────────────────────────────────────────────────
db.prepare(`INSERT INTO staff (name, jobTitle, bio) VALUES (:name, :jobTitle, :bio)`).run({
    name: "Dr Sarah Okonkwo",
    jobTitle: "Senior Lecturer in Computer Science",
    bio: "Sarah specialises in distributed systems and cloud computing. She has 12 years of industry experience before joining academia."
});
const sarah = db.prepare("SELECT id FROM staff ORDER BY id DESC LIMIT 1").get();

db.prepare(`INSERT INTO staff (name, jobTitle, bio) VALUES (:name, :jobTitle, :bio)`).run({
    name: "Prof James Hartley",
    jobTitle: "Professor of Cyber Security",
    bio: "James leads the university's cyber security research group. His work focuses on network intrusion detection and cryptographic protocols."
});
const james = db.prepare("SELECT id FROM staff ORDER BY id DESC LIMIT 1").get();

db.prepare(`INSERT INTO staff (name, jobTitle, bio) VALUES (:name, :jobTitle, :bio)`).run({
    name: "Dr Priya Nair",
    jobTitle: "Lecturer in Data Science",
    bio: "Priya holds a PhD in machine learning and has published widely on natural language processing and statistical modelling."
});
const priya = db.prepare("SELECT id FROM staff ORDER BY id DESC LIMIT 1").get();

// ─── Programmes ───────────────────────────────────────────────────────────────
db.prepare(`INSERT INTO programmes (title, level, description, published) VALUES (:title, :level, :description, 1)`).run({
    title: "BSc Computer Science",
    level: "UG",
    description: "A rigorous three-year programme covering algorithms, software engineering, databases, and systems programming. Prepares graduates for careers in software development, cloud computing, and technical leadership."
});
const cs = db.prepare("SELECT id FROM programmes ORDER BY id DESC LIMIT 1").get();

db.prepare(`INSERT INTO programmes (title, level, description, published) VALUES (:title, :level, :description, 1)`).run({
    title: "BSc Cyber Security",
    level: "UG",
    description: "Focuses on protecting systems and data from digital threats. Covers network security, cryptography, ethical hacking, and digital forensics. Highly relevant to today's threat landscape."
});
const cyber = db.prepare("SELECT id FROM programmes ORDER BY id DESC LIMIT 1").get();

db.prepare(`INSERT INTO programmes (title, level, description, published) VALUES (:title, :level, :description, 1)`).run({
    title: "BSc Software Engineering",
    level: "UG",
    description: "Combines software development with engineering discipline — requirements analysis, system design, testing, and project management. Ideal for students aiming to lead large-scale software projects."
});
const se = db.prepare("SELECT id FROM programmes ORDER BY id DESC LIMIT 1").get();

db.prepare(`INSERT INTO programmes (title, level, description, published) VALUES (:title, :level, :description, 1)`).run({
    title: "MSc Data Science",
    level: "PG",
    description: "A one-year postgraduate programme for graduates from any discipline. Covers statistics, machine learning, data visualisation, and big data tools. Includes a research project with an industry partner."
});
const ds = db.prepare("SELECT id FROM programmes ORDER BY id DESC LIMIT 1").get();

db.prepare(`INSERT INTO programmes (title, level, description, published) VALUES (:title, :level, :description, 1)`).run({
    title: "MSc Advanced Computer Science",
    level: "PG",
    description: "Deepens theoretical and practical expertise in areas such as artificial intelligence, compiler design, and high-performance computing. Designed for CS graduates seeking research or specialist roles."
});
const acs = db.prepare("SELECT id FROM programmes ORDER BY id DESC LIMIT 1").get();

// ─── Modules ──────────────────────────────────────────────────────────────────
// BSc Computer Science
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Introduction to Programming", description: "Variables, control flow, functions, and data structures using Python.", year: 1, programmeId: cs.id, staffId: sarah.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Web Technologies", description: "HTML, CSS, and JavaScript fundamentals. Building standards-compliant, accessible web pages.", year: 1, programmeId: cs.id, staffId: sarah.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Databases and SQL", description: "Relational database design, normalisation, SQL querying, and transactions.", year: 2, programmeId: cs.id, staffId: sarah.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Advanced Web Development", description: "Server-side rendering, REST APIs, authentication, and deployment using modern runtimes.", year: 3, programmeId: cs.id, staffId: sarah.id
});

// BSc Cyber Security
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Foundations of Security", description: "Core principles: confidentiality, integrity, availability. Threat modelling and risk assessment.", year: 1, programmeId: cyber.id, staffId: james.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Network Security", description: "Firewalls, VPNs, intrusion detection systems, and packet analysis using Wireshark.", year: 2, programmeId: cyber.id, staffId: james.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Ethical Hacking", description: "Penetration testing methodologies, vulnerability scanning, and responsible disclosure.", year: 3, programmeId: cyber.id, staffId: james.id
});

// BSc Software Engineering
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Software Design Patterns", description: "Gang of Four patterns, SOLID principles, and refactoring techniques.", year: 2, programmeId: se.id, staffId: sarah.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Agile and DevOps", description: "Scrum, Kanban, continuous integration, and deployment pipelines.", year: 2, programmeId: se.id, staffId: sarah.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Software Testing", description: "Unit testing, integration testing, TDD, and property-based testing.", year: 3, programmeId: se.id, staffId: sarah.id
});

// MSc Data Science
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Statistical Foundations", description: "Probability, hypothesis testing, regression, and Bayesian inference.", year: 1, programmeId: ds.id, staffId: priya.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Machine Learning", description: "Supervised and unsupervised learning, neural networks, and model evaluation.", year: 1, programmeId: ds.id, staffId: priya.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Big Data Engineering", description: "Distributed data processing with Spark, data pipelines, and cloud storage.", year: 1, programmeId: ds.id, staffId: priya.id
});

// MSc Advanced Computer Science
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Artificial Intelligence", description: "Search algorithms, knowledge representation, planning, and game-playing AI.", year: 1, programmeId: acs.id, staffId: sarah.id
});
db.prepare(`INSERT INTO modules (title, description, year, programmeId, staffId) VALUES (:title, :description, :year, :programmeId, :staffId)`).run({
    title: "Compiler Design", description: "Lexing, parsing, AST construction, code generation, and optimisation.", year: 1, programmeId: acs.id, staffId: sarah.id
});

// ─── Student Users ────────────────────────────────────────────────────────────
await createUser({ username: "alice", email: "alice@student.ac.uk", password: "password1" });
await createUser({ username: "bob",   email: "bob@student.ac.uk",   password: "password1" });

// ─── Interest Registrations ───────────────────────────────────────────────────
registerInterest("alice", cs.id);
registerInterest("alice", cyber.id);
registerInterest("alice", ds.id);
registerInterest("bob",   cs.id);
registerInterest("bob",   se.id);

console.log("Seed data added:");
console.log("  Staff:      Dr Sarah Okonkwo, Prof James Hartley, Dr Priya Nair");
console.log("  Programmes: BSc Computer Science, BSc Cyber Security, BSc Software Engineering, MSc Data Science, MSc Advanced Computer Science");
console.log("  Students:   alice / password1,  bob / password1");
console.log("  Interests:  alice → CS, Cyber, Data Science | bob → CS, Software Engineering");
