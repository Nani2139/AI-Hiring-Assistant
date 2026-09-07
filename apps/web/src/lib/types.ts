export type Job = {
  id: number;
  title: string;
  jd_text: string;
  questions: string;
  agent_id: string;
  agent_kind: string;
};

export type Person = {
  id?: number;
  job_id?: number;
  name: string;
  title: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  source: string;
};

export type InboxRow = {
  id: number;
  job_id: number;
  person_id: number;
  hunar_call_id: string;
  request_id: string;
  channel: string;
  status: string;
  phone: string;
  recording_url: string;
  result_json: string;
  summary: string;
  person_name: string;
  job_title: string;
};
