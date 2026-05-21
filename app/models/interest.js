import { db } from "../db.js";

export function registerInterest(username, programmeId) {
    db.prepare("INSERT OR IGNORE INTO interest (username, programmeId) VALUES (:username, :programmeId)").run({ username, programmeId: Number(programmeId) });
}

export function withdrawInterest(username, programmeId) {
    db.prepare("DELETE FROM interest WHERE username=:username AND programmeId=:programmeId").run({ username, programmeId: Number(programmeId) });
}

export function isRegistered(username, programmeId) {
    return !!db.prepare("SELECT 1 FROM interest WHERE username=:username AND programmeId=:programmeId").get({ username, programmeId: Number(programmeId) });
}

export function getInterestCount(programmeId) {
    return db.prepare("SELECT COUNT(*) as count FROM interest WHERE programmeId=:programmeId").get({ programmeId: Number(programmeId) }).count;
}

export function getInterestsByUsername(username) {
    return db.prepare(`
        SELECT i.programmeId, p.title
        FROM interest i
        JOIN programmes p ON i.programmeId = p.id
        WHERE i.username = :username
        ORDER BY p.title
    `).all({ username });
}

export function getMailingList() {
    return db.prepare(`
        SELECT i.id, p.title as programme, u.username, u.email, i.createdAt
        FROM interest i
        JOIN users u ON i.username = u.username
        JOIN programmes p ON i.programmeId = p.id
        ORDER BY p.title, u.username
    `).all();
}

export function deleteInterestById(id) {
    db.prepare("DELETE FROM interest WHERE id=:id").run({ id: Number(id) });
}

export function countInterest() {
    return db.prepare("SELECT COUNT(*) as count FROM interest").get().count;
}
