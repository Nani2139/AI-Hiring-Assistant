import { InboxRow, Job, Person } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function send<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export function getJobs() {
  return send<Job[]>("/jobs");
}

export function getJob(id: number) {
  return send<Job>(`/jobs/${id}`);
}

export function createJob(body: { title: string; jd_text: string; questions: string; agent_kind: string }) {
  return send<Job>("/jobs", { method: "POST", body: JSON.stringify(body) });
}

export function getPeople(jobId: number) {
  return send<Person[]>(`/jobs/${jobId}/people`);
}

export function addPerson(jobId: number, body: Person) {
  return send<Person>(`/jobs/${jobId}/people`, { method: "POST", body: JSON.stringify({ ...body, job_id: jobId }) });
}

export function searchPeople(jd_text: string) {
  return send<{
    people: Person[];
    parsed: { title: string; skills: string[]; location: string; city?: string; country?: string };
    source: string;
  }>("/search/people", {
    method: "POST",
    body: JSON.stringify({ jd_text }),
  });
}

export function saveShortlist(job_id: number, people: Person[]) {
  return send<Person[]>("/search/shortlist", { method: "POST", body: JSON.stringify({ job_id, people }) });
}

export function startCall(job_id: number, person_id: number, phone: string) {
  return send<InboxRow>("/calls", { method: "POST", body: JSON.stringify({ job_id, person_id, phone }) });
}

export function listInbox() {
  return send<InboxRow[]>("/inbox");
}

export function sendFollowup(call_id: number) {
  return send<InboxRow>("/calls/followup", { method: "POST", body: JSON.stringify({ call_id }) });
}
