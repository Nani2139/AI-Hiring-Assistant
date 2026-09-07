# Attendance without smartphones

Assume landlines, feature phones, SMS, USSD, IVR, biometric kiosks, and LLMs exist. Consumer apps do not.

## Design

Each of 100 sites gets a landline or feature phone and a printed roster with 4-digit PINs. Employees mark attendance by:

- calling a toll-free IVR from a registered number
- SMS such as `IN 4821`
- missed-call + PIN
- biometric or RFID kiosk at larger sites (hardware, not an app)

At shift start, a Voice AI agent calls the site supervisor, reads absentees, and stores structured answers: present count, absent IDs, late IDs, disputes.

## Why it scales to 1000 people

Most volume is automatic. Humans only handle exceptions. Voice AI replaces 100 daily supervisor check-ins. An LLM flags buddy punching, impossible travel, and roster vs headcount gaps, then briefs HR by email or IVR.
