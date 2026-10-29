// Fictional QA only. No real customer or lead data.
export const qualityTestReports = [
  {
    "case": "CRA",
    "packageId": "application",
    "draft": {
      "analysis": {
        "target": {
          "company": "ICON",
          "role": "CRA II and Senior CRA"
        },
        "critical_findings": [
          {
            "heading": "Meets documented independent monitoring minimum but scope limited",
            "interpretation": "Candidate's 18 months as a CRO CRA and statement of independently performing routine monitoring at six U.S. sites across two Phase III trials (C4, C5) suggests they satisfy the one-year independent monitoring requirement in the JD",
            "references": {
              "job_ids": [
                "J10"
              ],
              "candidate_ids": [
                "C4",
                "C5",
                "C9"
              ]
            }
          },
          {
            "heading": "Key visit ownership gaps for qualification/initiation",
            "interpretation": "The posting lists qualification and initiation visits (J3, J4); the candidate explicitly documents no independent site qualification or initiation (C6), which may not meet those specific responsibilities",
            "references": {
              "job_ids": [
                "J3",
                "J4"
              ],
              "candidate_ids": [
                "C6"
              ]
            }
          },
          {
            "heading": "Travel and eligibility constraints are unknown",
            "interpretation": "The role requires ~60% travel (J11) and U.S. location (J2). Candidate did not supply travel availability or work authorization (C10), which may prevent acceptance if not resolved",
            "references": {
              "job_ids": [
                "J11",
                "J10",
                "J11"
              ],
              "candidate_ids": [
                "C10"
              ]
            }
          }
        ],
        "executive_verdict": {
          "recommendation": "Clarify eligibility first",
          "competitiveness": "Professional interpretation",
          "summary": "Candidate appears to meet the posting's core documented monitoring minimum (J10) based on 18 months CRO CRA and stated independent routine monitoring (C4, C5, C9), which may meet the \"Minimum of 1 year of independent monitoring experience.\" However travel availability and work authorization are not supplied (C10) and independent qualification/init/",
          "reasons_for": [],
          "reasons_against": []
        },
        "decision_drivers": [
          {
            "requirement": "Responsibilities include site monitoring across qualification",
            "jd_evidence": "Responsibilities include site monitoring across qualification",
            "classification": "responsibility",
            "job_id": "J3"
          },
          {
            "requirement": "initiation",
            "jd_evidence": "initiation",
            "classification": "responsibility",
            "job_id": "J4"
          },
          {
            "requirement": "routine monitoring and close-out",
            "jd_evidence": "routine monitoring and close-out",
            "classification": "responsibility",
            "job_id": "J5"
          },
          {
            "requirement": "checking protocol and GCP adherence",
            "jd_evidence": "checking protocol and GCP adherence",
            "classification": "responsibility",
            "job_id": "J6"
          },
          {
            "requirement": "reviewing trial records and data quality",
            "jd_evidence": "reviewing trial records and data quality",
            "classification": "responsibility",
            "job_id": "J7"
          },
          {
            "requirement": "maintaining clinical-trial systems and collaborating with site teams.",
            "jd_evidence": "maintaining clinical-trial systems and collaborating with site teams.",
            "classification": "responsibility",
            "job_id": "J8"
          }
        ],
        "evidence_map": [
          {
            "driver": "Responsibilities include site monitoring across qualification",
            "classification": "responsibility",
            "candidate_evidence": "Supported one close-out visit; no independent site qualification or initiation documented.",
            "candidate_quotes": [
              "Supported one close-out visit; no independent site qualification or initiation documented."
            ],
            "strength": "missing",
            "gap_type": "evidence_gap",
            "risk": "Qualification visit ownership is explicitly not documented by the candidate (C6).",
            "action": "Ask candidate to confirm any independent site qualification experience or provide notes/visit forms if present."
          },
          {
            "driver": "initiation",
            "classification": "responsibility",
            "candidate_evidence": "Supported one close-out visit; no independent site qualification or initiation documented.",
            "candidate_quotes": [
              "Supported one close-out visit; no independent site qualification or initiation documented."
            ],
            "strength": "missing",
            "gap_type": "evidence_gap",
            "risk": "Initiation visit ownership is explicitly not documented (C6).",
            "action": "Request example initiation visit documentation or clarify if they assisted versus owned initiations."
          },
          {
            "driver": "routine monitoring and close-out",
            "classification": "responsibility",
            "candidate_evidence": "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials. Supported one close-out visit; no independent site qualification or initiation documented.",
            "candidate_quotes": [
              "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials.",
              "Supported one close-out visit; no independent site qualification or initiation documented."
            ],
            "strength": "partial",
            "gap_type": "evidence_gap",
            "risk": "Candidate independently performed routine monitoring (C5) and supported one close-out (C6), so monitoring coverage is partial relative to full qualification/initiation/close-out ownership.",
            "action": "If close-out ownership is required, ask for details of the close-out visit role and any sign-off responsibilities."
          },
          {
            "driver": "checking protocol and GCP adherence",
            "classification": "responsibility",
            "candidate_evidence": "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials. ICH-GCP training listed.",
            "candidate_quotes": [
              "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials.",
              "ICH-GCP training listed."
            ],
            "strength": "partial",
            "gap_type": "evidence_gap",
            "risk": "ICH-GCP training is documented (C9) and routine monitoring likely included protocol/GCP checks (C5), but explicit examples of non-routine protocol interpretation or complex compliance decisions are absent.",
            "action": "Collect one or two short, specific examples where the candidate identified and resolved a protocol or GCP deviation."
          },
          {
            "driver": "reviewing trial records and data quality",
            "classification": "responsibility",
            "candidate_evidence": "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials. Tracked overdue queries with site staff and escalated a recurring documentation issue to a CTM.",
            "candidate_quotes": [
              "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials.",
              "Tracked overdue queries with site staff and escalated a recurring documentation issue to a CTM."
            ],
            "strength": "partial",
            "gap_type": "evidence_gap",
            "risk": "Candidate monitored sites (C5) and tracked queries/escalated documentation issues (C7), indicating engagement with data quality but no quantifiable outcomes provided.",
            "action": "Request sample query tracking metrics or a concise description of a data-quality issue and the candidate's actions."
          },
          {
            "driver": "maintaining clinical-trial systems and collaborating with site teams.",
            "classification": "responsibility",
            "candidate_evidence": "Tracked overdue queries with site staff and escalated a recurring documentation issue to a CTM. Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials.",
            "candidate_quotes": [
              "Tracked overdue queries with site staff and escalated a recurring documentation issue to a CTM.",
              "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials."
            ],
            "strength": "partial",
            "gap_type": "evidence_gap",
            "risk": "Evidence of collaborating with site staff (tracking queries, escalation to CTM; C7) exists, but maintaining clinical-trial systems is not documented.",
            "action": "Clarify which CTMS/electronic systems the candidate used and level of independent system maintenance responsibility."
          }
        ],
        "company_intelligence": [
          {
            "finding": "Minimum of 1 year of independent monitoring experience.",
            "why_it_matters": "This job posting phrase confirms the JD's documented mandatory experience and suggests verification of monitoring tenure should be prioritized.",
            "provenance": "verified_public",
            "source_urls": [
              "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448"
            ],
            "source_id": "S1"
          },
          {
            "finding": "Submitting AI-generated content that inaccurately portrays one's skills, experiences, or qualifications.",
            "why_it_matters": "ICON's applicant AI policy confirms applications will be reviewed for authentic representations; prepare truthful, candidate-sourced examples rather than pasted AI output.",
            "provenance": "verified_public",
            "source_urls": [
              "https://careers.iconplc.com/ai-usage-policy-for-job-applicants"
            ],
            "source_id": "S2"
          }
        ],
        "positioning_strategy": {
          "headline": "Prioritize evidence, eligibility and accurate positioning.",
          "top_changes": [
            {
              "change": "Clarify eligibility and travel/authorization before applying",
              "why": "Travel (~60%, J11) and U.S. work authorization are unstated (C10). These are gating constraints for a U.S.-based CRA role.",
              "rank": 1,
              "references": {
                "job_ids": [
                  "J11",
                  "J10"
                ],
                "candidate_ids": [
                  "C10"
                ]
              }
            },
            {
              "change": "Collect short evidence packets for qualification/initiation gaps",
              "why": "The posting requires conducting qualification and initiation (J3, J4), but the candidate explicitly lacks independent evidence (C6). A brief packet (visit date,",
              "rank": 2,
              "references": {
                "job_ids": [
                  "J3",
                  "J4"
                ],
                "candidate_ids": [
                  "C6"
                ]
              }
            },
            {
              "change": "Prepare 2–3 concise, candidate-written examples of monitoring challenges",
              "why": "ICON expects authentic demonstrations of monitoring judgment (J5, J6, J7); documented examples will align with the AI policy (S2) and fill missing detail on how",
              "rank": 3,
              "references": {
                "job_ids": [
                  "J5",
                  "J6",
                  "J7"
                ],
                "candidate_ids": [
                  "C5",
                  "C7",
                  "C9"
                ]
              }
            },
            {
              "change": "If eligibility confirmed, tailor application to verified responsibilities",
              "why": "Emphasize verified independent routine monitoring (C5) and ICH-GCP training (C9); avoid claiming initiation/qualification ownership unless evidence exists (C6).",
              "rank": 4,
              "references": {
                "job_ids": [
                  "J5",
                  "J6"
                ],
                "candidate_ids": [
                  "C5",
                  "C9",
                  "C6"
                ]
              }
            }
          ],
          "resume_edits": []
        },
        "interview_map": [],
        "clarification_questions": [
          {
            "question": "Do you have U.S. work authorization (if role location requires it) and are you able to travel ~60%?",
            "why_needed": "Travel and legal eligibility are gating constraints for a U.S.-based CRA role (J11); candidate did not supply this (C10).",
            "impact": "Clarify before making application or interview claims."
          },
          {
            "question": "Did you ever independently own a site qualification or initiation visit? If yes, supply dates and a short description or visit report.",
            "why_needed": "The JD lists qualification and initiation (J3, J4) but the candidate explicitly states no independent qualification/initiation documented (C6).",
            "impact": "Clarify before making application or interview claims."
          },
          {
            "question": "Which CTMS/electronic systems did you use for monitoring, and what independent responsibilities did you have maintaining them?",
            "why_needed": "The JD requests maintaining clinical-trial systems (J8) and candidate system ownership is not documented.",
            "impact": "Clarify before making application or interview claims."
          }
        ],
        "source_index": [
          {
            "url": "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448",
            "title": "CRA II and Senior CRA job in Regional United States (PRA) | ICON",
            "type": "target_job",
            "date": "Access checked 2026-10-29; publication date not independently established",
            "id": "S1"
          },
          {
            "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
            "title": "ICON Plc: AI Usage Policy for Job Applicants",
            "type": "applicant_ai_policy",
            "date": "Access checked 2026-10-29; publication date not independently established",
            "id": "S2"
          }
        ],
        "quality_notes": [
          "Candidate excerpts below are exact intake text, not independently verified employment history.",
          "Recommendations and practice prompts are professional interpretation, not employer promises or confirmed interview questions."
        ]
      },
      "qualityFlags": [
        "Mandatory screening criteria are missing from the evidence map.",
        "Narrative contains an unfinished sentence or clipped recommendation.",
        "Do not request confidential trial visit reports or forms; ask for a deidentified description.",
        "Independent monitoring duration is not established for all 18 months of the CRA job; the minimum-experience conclusion needs qualification.",
        "The source-policy implication overstates a universal application-review practice."
      ],
      "requiresFounderReview": true,
      "engineVersion": "0.3.0-evidence-bound",
      "researchedAt": "2026-10-29T02:14:56.814Z",
      "inputIntegrity": {
        "company": "ICON",
        "role": "CRA II and Senior CRA",
        "jdSHA256": "f252815acdcb8e882a0202f0693236b1593054767904d9b1961069df7ac9570b",
        "cvSHA256": "b5374d79edf255dd2bc57cef15beb6664d224438c725bf9b3540971557a3525f"
      },
      "evidenceCatalogue": {
        "jobs": [
          {
            "id": "J1",
            "text": "QA paraphrase of ICON public vacancy JR159321, retrieved October 28, 2026.",
            "kind": "context"
          },
          {
            "id": "J2",
            "text": "Role: CRA II and Senior CRA, United States.",
            "kind": "context"
          },
          {
            "id": "J3",
            "text": "Responsibilities include site monitoring across qualification",
            "kind": "responsibility"
          },
          {
            "id": "J4",
            "text": "initiation",
            "kind": "responsibility"
          },
          {
            "id": "J5",
            "text": "routine monitoring and close-out",
            "kind": "responsibility"
          },
          {
            "id": "J6",
            "text": "checking protocol and GCP adherence",
            "kind": "responsibility"
          },
          {
            "id": "J7",
            "text": "reviewing trial records and data quality",
            "kind": "responsibility"
          },
          {
            "id": "J8",
            "text": "maintaining clinical-trial systems and collaborating with site teams.",
            "kind": "responsibility"
          },
          {
            "id": "J9",
            "text": "The posting requests a relevant bachelor's degree",
            "kind": "mandatory"
          },
          {
            "id": "J10",
            "text": "at least one year of independent monitoring experience and ICH-GCP knowledge.",
            "kind": "mandatory"
          },
          {
            "id": "J11",
            "text": "Approximately 60 percent travel is indicated.",
            "kind": "constraint"
          },
          {
            "id": "J12",
            "text": "Assess the candidate's precise visit ownership, practical constraints and clinical judgment.",
            "kind": "context"
          },
          {
            "id": "J13",
            "text": "The shared posting title alone does not establish senior-level readiness.",
            "kind": "context"
          },
          {
            "id": "J14",
            "text": "Sponsor assignment and therapeutic area for this individual are not verified by these inputs.",
            "kind": "context"
          },
          {
            "id": "J15",
            "text": "This paraphrase is test material; consult the linked employer posting for exact wording and current vacancy status.",
            "kind": "context"
          }
        ],
        "candidates": [
          {
            "id": "C1",
            "text": "FICTIONAL QA CANDIDATE — not a real person."
          },
          {
            "id": "C2",
            "text": "Candidate A."
          },
          {
            "id": "C3",
            "text": "BSc Biology."
          },
          {
            "id": "C4",
            "text": "Two years as a site Clinical Research Coordinator, followed by 18 months as a CRO Clinical Research Associate."
          },
          {
            "id": "C5",
            "text": "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials."
          },
          {
            "id": "C6",
            "text": "Supported one close-out visit; no independent site qualification or initiation documented."
          },
          {
            "id": "C7",
            "text": "Tracked overdue queries with site staff and escalated a recurring documentation issue to a CTM."
          },
          {
            "id": "C8",
            "text": "No measured reduction, inspection outcome, trial leadership or mentoring supplied."
          },
          {
            "id": "C9",
            "text": "ICH-GCP training listed."
          },
          {
            "id": "C10",
            "text": "Travel availability and work authorization are not supplied."
          },
          {
            "id": "C11",
            "text": "Do not invent achievements or infer that CRC time is independent monitoring experience."
          }
        ]
      },
      "sourceChecks": [
        {
          "url": "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448",
          "finalURL": "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448",
          "status": "available",
          "title": "CRA II and Senior CRA job in Regional United States (PRA) | ICON",
          "contentSHA256": "fa024fec7552d430a219e77e5c37fd230b25ee14fbd32cd50a1bb5907e6391ec",
          "id": "S1",
          "checkedAt": "2026-10-29T02:14:33.104Z",
          "kind": "target_job",
          "employerDomainMatch": true
        },
        {
          "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
          "finalURL": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
          "status": "available",
          "title": "ICON Plc: AI Usage Policy for Job Applicants",
          "contentSHA256": "a596967ad5c06d780412f876f6e44b326a6a938a3dde1d1f95f87d18d0c8ee1c",
          "id": "S2",
          "checkedAt": "2026-10-29T02:14:33.334Z",
          "kind": "applicant_ai_policy",
          "employerDomainMatch": true
        }
      ],
      "policy": {
        "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
        "title": "ICON Plc: AI Usage Policy for Job Applicants"
      },
      "researchGaps": [],
      "telemetry": {
        "durationMs": 35502,
        "calls": [
          {
            "stage": "research",
            "model": "openai/gpt-5-mini",
            "requestStarted": "2026-10-29T02:14:21.316Z",
            "responseID": "gen_01M62PZNCNBQF5VZHB75RM0JK0",
            "inputTokens": 9349,
            "outputTokens": 890,
            "durationMs": 11195
          },
          {
            "stage": "synthesis",
            "model": "openai/gpt-5-mini",
            "requestStarted": "2026-10-29T02:14:33.336Z",
            "responseID": "gen_01M62Q0149T0M5GD5VB2KZXP72",
            "inputTokens": 4366,
            "outputTokens": 2416,
            "durationMs": 23477
          }
        ],
        "costUSD": null,
        "costNote": "Token usage is recorded when supplied. Tool and provider charges require reconciliation with Gateway billing."
      }
    },
    "baseline": "Independent Application Assessment and Improvement Plan\nTarget: ICON — CRA II and Senior CRA (JR159321)\nSources inspected: ICON job posting (S1: https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448) and ICON Applicant AI Policy (S2: https://careers.iconplc.com/ai-usage-policy-for-job-applicants).\n\nFact summary (from supplied materials)\n- Mandatory (explicit in S1): Bachelor’s degree in scientific/healthcare field; minimum 1 year of independent monitoring experience; in-depth ICH‑GCP knowledge; willingness to travel ≈60% (S1). \n- Key responsibilities listed by ICON: site qualification, initiation, routine monitoring, close‑out visits; ensure protocol/GCP compliance, data integrity, patient safety; collaborate with investigators/site staff; perform data review and query resolution; maintain clinical systems and contribute to study documentation (S1).\n- ICON applicant AI policy prohibits misrepresentation, unedited AI outputs, and requires authentic application materials (S2).\n- Unknown / not verifiable from packet: sponsor assignment, therapeutic area for this candidate, travel availability and work authorization (J14; C10).\n\nThree critical findings (distinct fact vs interpretation)\n1) Gap in documented visit ownership: Candidate A has 18 months CRO CRA experience with “independently performed routine monitoring at six U.S. sites” and “supported one close‑out visit,” but no documented independent qualification or initiation visits (C4–C6). Interpretation: This limits direct evidence they meet ICON’s explicit requirement for end‑to‑end monitoring activities (qualification/initiation/close‑out) expected for CRA II/Senior CRA (S1).\n2) Minimum experience threshold likely met, but senior readiness ambiguous: Candidate A exceeds the 1‑year independent monitoring minimum (C4–C5), however ICON notes the posting title alone “does not establish senior‑level readiness” (J13). Interpretation: Candidate meets baseline but lacks evidence of expanded responsibilities (trial ownership, mentoring, documented leadership, inspection experience) which ICON may expect for Senior CRA (S1).\n3) Compliance and escalation experience present but limited metrics: Candidate tracked overdue queries and escalated a recurring documentation issue to CTM; ICH‑GCP training listed (C7, C9). Interpretation: Shows GCP awareness and escalation behavior but lacks measurable outcomes (reduction in queries, remediation results, audit/inspection involvement) that would strengthen candidacy for ICON roles emphasizing data quality and protocol compliance (S1).\n\nCandidate strengths (evidence‑based)\n- Meets educational requirement (BSc Biology) (C3) and ICH‑GCP training documented (C9).\n- At least 18 months independent CRA field experience across Phase III cardiometabolic trials and multiple U.S. sites — satisfies ICON’s ≥1 year independent monitoring requirement (C4–C5; S1).\n- Demonstrated routine monitoring ownership and escalation of site issues — indicates operational familiarity with query management and site collaboration (C5–C7).\n\nCandidate gaps or risks (evidence‑based)\n- No documented independent site qualification or initiation experience (C6) — these are explicit responsibilities in the ICON posting (S1).\n- Limited evidence of close‑out ownership (only “supported one close‑out”), and no evidence of trial ownership, budget management, mentoring, or inspection outcomes (C6–C8; J13).\n- Missing logistics: travel availability and work authorization not provided (C10), yet ICON requires ~60% travel (S1).\n\nEmployer‑specific implications\n- ICON will verify independent monitoring scope and may screen for initiation/qualification and full visit ownership — absence of these may reclassify candidate as CRA II rather than Senior CRA or trigger interview probes (S1, J13).\n- ICON’s AI policy (S2) requires authentic, candidate‑personalized application content; any AI usage must not misrepresent candidate experience. Candidate must disclose and accurately describe responsibilities/outcomes.\n\nThree ranked practical next actions (highest impact first)\n1) Clarify and document specific monitoring responsibilities and outcomes (Immediate): Update résumé and application to state exact independent visit types and responsibilities—number and dates of routine monitoring visits, any independent close‑out/qualification/initiation involvement even as co‑lead, and systems used (e.g., EDC, CTMS). If none for qualification/initiation, state clearly. (Rationale: addresses ICON’s explicit responsibilities and avoids misrepresentation per S2.)\n2) Provide measurable evidence of impact (short term): Add concrete metrics where true—number of queries opened/closed, average query turnaround time improvement, examples of issue escalations and resolutions, any corrective action plan participation, and GCP training date. If no metrics exist, obtain supervisor reference or site contact who can verify scope. (Rationale: strengthens data‑quality and compliance claims ICON values S1.)\n3) Supply logistical readiness and seniority signals (short‑to‑mid term): State travel availability and work authorization clearly; if seeking Senior CRA, emphasize any cross‑functional collaboration, mentoring, system administration or lead‑monitor tasks done; obtain brief line manager statement on independence/ownership. If lacking initiation/qualification exposure, target CRA II roles and be transparent. (Rationale: aligns to travel constraint and seniority expectations S1; complies with AI policy S2.)\n\nApplication positioning (concise)\n- Position for CRA II primarily: emphasize BSc, >1 year independent monitoring across Phase III U.S. sites, ICH‑GCP, routine monitoring ownership, and query management. Explicitly disclose that initiation/qualification experience is not documented and offer supervisor verification for monitoring independence. If seeking Senior CRA, only do so if you can document trial ownership, mentoring, or leadership responsibilities.\n\nRésumé improvement priorities (specific, conditional on evidence)\n- Add a concise “Monitoring Experience” bullet list with verified facts: number of sites monitored independently, trial phase (Phase III cardiometabolic), types of visits performed (state initiation/qualification only if true), EDC/CTMS systems used, and % travel undertaken.\n- Quantify outcomes: queries opened/closed, issue escalations and resolutions, any timeline adherence or data‑cleaning contributions.\n- Add GCP training date and any site or sponsor audit participation; include a verifiable referee (CTM/line manager) to confirm independence and visit ownership.\n\nLimitations\n- Sponsor assignment, TA, travel/work‑authorization status were not available in the packet and must be provided by the candidate or verified by ICON (J14; C10).\n\nRespect ICON’s AI policy: tailor and authenticate all application text; do not submit unedited AI outputs (S2).",
    "stages": [
      {
        "stage": "research",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T02:14:21.316Z",
        "responseID": "gen_01M62PZNCNBQF5VZHB75RM0JK0",
        "inputTokens": 9349,
        "outputTokens": 890,
        "durationMs": 11195,
        "status": "completed",
        "outputCharacters": 1463,
        "sourceURLs": 19,
        "incompleteReason": null
      },
      {
        "stage": "synthesis",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T02:14:33.336Z",
        "responseID": "gen_01M62Q0149T0M5GD5VB2KZXP72",
        "inputTokens": 4366,
        "outputTokens": 2416,
        "durationMs": 23477,
        "status": "completed",
        "outputCharacters": 7969,
        "sourceURLs": 0,
        "incompleteReason": null
      },
      {
        "stage": "baseline",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T02:14:56.817Z",
        "responseID": "gen_01M62Q0R25E275G5BQVV7WCDEX",
        "inputTokens": 3378,
        "outputTokens": 1496,
        "durationMs": 22981,
        "status": "completed",
        "outputCharacters": 6933,
        "sourceURLs": 0,
        "incompleteReason": null
      }
    ],
    "note": "Actual one-attempt output text is unedited; review annotations are added. Current deterministic checks replayed locally without model calls. Semantic defects remain; neither product is approved."
  },
  {
    "case": "CTM",
    "packageId": "interview",
    "draft": {
      "analysis": {
        "target": {
          "company": "ICON",
          "role": "Clinical Trial Manager II Biotech — United States, Remote"
        },
        "critical_findings": [
          {
            "heading": "Minimum CTM tenure mismatch",
            "interpretation": "The job requires at least two years in a CTM position at a CRO (J10). The candidate reports 18 months as an Associate CTM (C4). J16 cautions that Associate CTM duties are not automatically equivalent to qualifying CTM ownership.",
            "references": {
              "job_ids": [
                "J10",
                "J6",
                "J14"
              ],
              "candidate_ids": [
                "C4"
              ]
            }
          },
          {
            "heading": "Partial operational experience vs. ownership",
            "interpretation": "Role responsibilities include clinical budget oversight, start-up through database-lock, CRA mentoring, and sponsor/vendor relationships (J3, J6, J5, J14, J9). Candidate evidence shows supported budget tracker activity but 'didnot",
            "references": {
              "job_ids": [
                "J3",
                "J5",
                "J6"
              ],
              "candidate_ids": [
                "C7",
                "C6",
                "C8"
              ]
            }
          },
          {
            "heading": "Monitoring experience below preferred level",
            "interpretation": "ICON strongly prefers two years of monitoring experience (J12). Candidate reports three years as a CRO CRA (C4), which may satisfy the preferred monitoring expectation, but monitoring duration is a preferred, not mandatory, hiring",
            "references": {
              "job_ids": [
                "J12"
              ],
              "candidate_ids": [
                "C4"
              ]
            }
          }
        ],
        "executive_verdict": {
          "recommendation": "Clarify eligibility first",
          "competitiveness": "Professional interpretation",
          "summary": "Candidate C4 shows 18 months as an Associate CTM at a CRO, but J10 mandates at least two years in a CTM position at a CRO. J16 explicitly warns Associate CTM duties must not automatically be treated as two years of qualifying CTM ownership. Before investing in interview prep, confirm with ICON whether the candidate's Associate CTM title and scope (",
          "reasons_for": [],
          "reasons_against": []
        },
        "decision_drivers": [
          {
            "requirement": "The Level 2 profile requires at least two years in a CTM position at a CRO",
            "jd_evidence": "The Level 2 profile requires at least two years in a CTM position at a CRO",
            "classification": "mandatory",
            "job_id": "J10"
          },
          {
            "requirement": "a relevant bachelor's degree and at least eight years of relevant experience.",
            "jd_evidence": "a relevant bachelor's degree and at least eight years of relevant experience.",
            "classification": "mandatory",
            "job_id": "J11"
          },
          {
            "requirement": "Responsibilities include clinical budget oversight",
            "jd_evidence": "Responsibilities include clinical budget oversight",
            "classification": "responsibility",
            "job_id": "J3"
          },
          {
            "requirement": "start-up through database-lock experience and mentoring other CTMs are preferred.",
            "jd_evidence": "start-up through database-lock experience and mentoring other CTMs are preferred.",
            "classification": "preferred",
            "job_id": "J14"
          }
        ],
        "evidence_map": [
          {
            "driver": "The Level 2 profile requires at least two years in a CTM position at a CRO",
            "classification": "mandatory",
            "candidate_evidence": "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO.",
            "candidate_quotes": [
              "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO."
            ],
            "strength": "partial",
            "gap_type": "evidence_gap",
            "risk": "Candidate has 18 months in an Associate CTM role at a CRO (C4), which is less than the mandatory two years in a CTM position at a CRO (J10). Whether this is acceptable requires employer confirmation.",
            "action": "Ask ICON to confirm if the 18 months Associate CTM role meets their two-year CTM requirement or if additional CTM ownership is needed."
          },
          {
            "driver": "a relevant bachelor's degree and at least eight years of relevant experience.",
            "classification": "mandatory",
            "candidate_evidence": "BSc Nursing and MSc Clinical Research.",
            "candidate_quotes": [
              "BSc Nursing and MSc Clinical Research."
            ],
            "strength": "strong",
            "gap_type": "none",
            "risk": "J11 requires a relevant bachelor's degree and at least eight years relevant experience. Candidate lists BSc Nursing and MSc Clinical Research (C3) but total relevant years supplied sum to less than eight; aggregate years",
            "action": "Confirm total qualifying 'relevant experience' years and whether the candidate's combined site and CRO experience meets the eight-year threshold."
          },
          {
            "driver": "Responsibilities include clinical budget oversight",
            "classification": "responsibility",
            "candidate_evidence": "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts.",
            "candidate_quotes": [
              "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts."
            ],
            "strength": "partial",
            "gap_type": "evidence_gap",
            "risk": "Role lists clinical budget oversight (J3). Candidate supported the clinical budget tracker but explicitly did not own or approve budgets (C7).",
            "action": "Clarify whether ICON requires independent budget ownership/negotiation experience or accepts supporting/tracking experience for this role."
          },
          {
            "driver": "start-up through database-lock experience and mentoring other CTMs are preferred.",
            "classification": "preferred",
            "candidate_evidence": "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied.",
            "candidate_quotes": [
              "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied."
            ],
            "strength": "missing",
            "gap_type": "evidence_gap",
            "risk": "Start-up through database-lock and mentoring other CTMs are preferred (J14). Candidate explicitly reports no database-lock ownership or CTM mentoring (C8).",
            "action": "If these preferred items are decisive, candidate should gather examples of related contributions or plan to discuss hypothetical approach."
          }
        ],
        "company_intelligence": [
          {
            "finding": "r) for the purposes of building/creating artificial intelligence/machine learning models for the purposes/processing listed in this section.",
            "why_it_matters": "This may indicate ICON uses AI/ML in data processes and suggests preparation should avoid exposing confidential data and be ready to discuss responsible-data practices.",
            "provenance": "verified_public",
            "source_urls": [
              "https://www.iconplc.com/privacy/business-professionals"
            ],
            "source_id": "S2"
          }
        ],
        "positioning_strategy": {
          "headline": "Prioritize evidence, eligibility and accurate positioning.",
          "top_changes": [
            {
              "change": "Confirm eligibility on CTM tenure and total relevant years with ICON or recruiter",
              "why": "Mandatory J10 (two years CTM at a CRO) and J11 (eight years relevant experience) are not clearly met by candidate evidence C4 and aggregated experience.",
              "rank": 1,
              "references": {
                "job_ids": [
                  "J10",
                  "J11"
                ],
                "candidate_ids": [
                  "C4",
                  "C3",
                  "C4"
                ]
              }
            },
            {
              "change": "If eligibility confirmed, craft short evidence-based narratives highlighting ownership-adjacent tasks",
              "why": "Candidate has concrete operational tasks (C6, C5) that map to J6, J4 and J7; these can be framed as contribution examples if CTM ownership is accepted.",
              "rank": 2,
              "references": {
                "job_ids": [
                  "J6",
                  "J4",
                  "J7"
                ],
                "candidate_ids": [
                  "C6",
                  "C5",
                  "C6"
                ]
              }
            },
            {
              "change": "Prepare gap-bridging explanations for budget and database-lock responsibilities",
              "why": "Candidate explicitly did not own budgets (C7) and has no database-lock ownership (C8). Interviewers often probe how candidates would handle full ownership.",
              "rank": 3,
              "references": {
                "job_ids": [
                  "J3",
                  "J14"
                ],
                "candidate_ids": [
                  "C7",
                  "C8"
                ]
              }
            },
            {
              "change": "Highlight monitoring experience and site/CRO perspective",
              "why": "J12 prefers two years monitoring; candidate lists three years as a CRO CRA (C4) which may support operational credibility even if CTM tenure is short.",
              "rank": 4,
              "references": {
                "job_ids": [
                  "J12"
                ],
                "candidate_ids": [
                  "C4"
                ]
              }
            }
          ],
          "resume_edits": []
        },
        "interview_map": [
          {
            "question": "Describe a time you owned study start-up activities and met enrollment milestones.",
            "competency": "Start-up & enrollment management",
            "best_candidate_evidence": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries. Supported a Phase III U.S. cardiometabolic study across 24 sites.",
            "answer_strategy": "If you have direct start-up ownership, give a concise STAR covering scope, actions, and measurable outcome. If not, acknowledge supporting role (C6, C5), then present a clear hypothetical stepwise plan you would execute to drive start-up and enrollment timelines.",
            "missing_info": "C8 (no independent end-to-end global trial leadership) indicates no confirmed end-to-end ownership.",
            "avoid": "Do not claim experience or outcomes absent from your intake. Describe a hypothetical approach explicitly when experience is missing.",
            "provenance": "inference"
          },
          {
            "question": "How have you handled clinical budget responsibilities and sponsor/vendor negotiations?",
            "competency": "Budget oversight & vendor relationships",
            "best_candidate_evidence": "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts. Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries.",
            "answer_strategy": "State actual supportive activities (tracked budgets, maintained trackers per C7/C6). If you lack ownership, say so, then explain the process you would follow to own budget changes and contract negotiation, including stakeholders, approval checkpoints and controls.",
            "missing_info": "C7 shows candidate did not approve or negotiate budgets.",
            "avoid": "Do not claim experience or outcomes absent from your intake. Describe a hypothetical approach explicitly when experience is missing.",
            "provenance": "inference"
          },
          {
            "question": "Give an example of mentoring or training a CRA or CTM.",
            "competency": "CRA training & mentoring",
            "best_candidate_evidence": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries. No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied.",
            "answer_strategy": "If you have mentoring examples, use them with specifics. If none (C8), acknowledge the gap and present a short mentoring framework you would use (onboarding plan, competency checks, feedback cadence).",
            "missing_info": "C8 indicates no CTM mentoring provided.",
            "avoid": "Do not claim experience or outcomes absent from your intake. Describe a hypothetical approach explicitly when experience is missing.",
            "provenance": "inference"
          },
          {
            "question": "How do you ensure quality through trip-report review and CAPA initiation?",
            "competency": "Quality oversight and corrective actions",
            "best_candidate_evidence": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries. No claimed inspection or hiring outcomes.",
            "answer_strategy": "Describe your trip-report review routine and escalation triggers based on C6 activities. For CAPAs, if you lack ownership, outline a concrete escalation and CAPA development template you would propose.",
            "missing_info": "No claimed inspection or CAPA ownership (C11,C8).",
            "avoid": "Do not claim experience or outcomes absent from your intake. Describe a hypothetical approach explicitly when experience is missing.",
            "provenance": "inference"
          }
        ],
        "clarification_questions": [
          {
            "question": "Can ICON confirm whether 18 months as an Associate CTM at a CRO satisfies their 'at least two years in a CTM position at a CRO' requirement (J10)?",
            "why_needed": "J16 warns Associate CTM duties are not automatically equivalent to qualifying CTM ownership; this determines basic eligibility.",
            "impact": "Clarify before making application or interview claims."
          },
          {
            "question": "Does ICON require independent clinical budget ownership and contract negotiation experience, or will strong supporting experience (tracking and coordination) be acceptable (J3)?",
            "why_needed": "Candidate C7 explicitly did not own or approve budgets.",
            "impact": "Clarify before making application or interview claims."
          },
          {
            "question": "Is start-up through database-lock and mentoring other CTMs (J14) a gating requirement or a preferred competency for progression?",
            "why_needed": "Candidate C8 reports no database-lock ownership or CTM mentoring; clarity will shape prep strategy.",
            "impact": "Clarify before making application or interview claims."
          },
          {
            "question": "Does ICON treat cumulative site and CRA years as 'relevant experience' toward the eight-year requirement in J11, and which roles count?",
            "why_needed": "Candidate lists site CRC plus CRA plus Associate CTM (C4,C5) but total qualifying years were not verified.",
            "impact": "Clarify before making application or interview claims."
          }
        ],
        "source_index": [
          {
            "url": "https://www.iconplc.com/privacy/business-professionals",
            "title": "Business Professionals | ICON",
            "type": "employer_context",
            "date": "Access checked 2026-10-29; publication date not independently established",
            "id": "S2"
          }
        ],
        "quality_notes": [
          "Candidate excerpts below are exact intake text, not independently verified employment history.",
          "Recommendations and practice prompts are professional interpretation, not employer promises or confirmed interview questions."
        ]
      },
      "qualityFlags": [
        "Narrative contains an unfinished sentence or clipped recommendation.",
        "Experience arithmetic conflicts with the stated intake durations.",
        "The monitoring headline conflicts with the stated three-year CRA tenure and two-year preferred criterion; actual independent monitoring duration still needs confirmation.",
        "A general privacy notice does not support role-specific hiring or interview expectations.",
        "The publicly available applicant AI policy was missed in the original research packet.",
        "The practice framework must not imply start-up support that the intake never established."
      ],
      "requiresFounderReview": true,
      "engineVersion": "0.3.0-evidence-bound",
      "researchedAt": "2026-10-29T02:16:01.400Z",
      "inputIntegrity": {
        "company": "ICON",
        "role": "Clinical Trial Manager II Biotech — United States, Remote",
        "jdSHA256": "91840b3eb25eef44aacc32e39da0ee02b4df8d07513412c7ab2cf80656f8ca4f",
        "cvSHA256": "656fb2f0db876b71e0ff7399d142e0a97b0000a0f21cf2abcca459cf834ec0c7"
      },
      "evidenceCatalogue": {
        "jobs": [
          {
            "id": "J1",
            "text": "QA paraphrase of ICON public vacancy JR121420, retrieved October 28, 2026.",
            "kind": "context"
          },
          {
            "id": "J2",
            "text": "Clinical Trial Manager II, Biotech, U.S. remote, with general-medicine therapeutic alignment.",
            "kind": "context"
          },
          {
            "id": "J3",
            "text": "Responsibilities include clinical budget oversight",
            "kind": "responsibility"
          },
          {
            "id": "J4",
            "text": "monitoring plans",
            "kind": "responsibility"
          },
          {
            "id": "J5",
            "text": "CRA training and mentoring",
            "kind": "responsibility"
          },
          {
            "id": "J6",
            "text": "study start-up and enrollment timelines",
            "kind": "responsibility"
          },
          {
            "id": "J7",
            "text": "trip-report review",
            "kind": "responsibility"
          },
          {
            "id": "J8",
            "text": "corrective and preventive actions",
            "kind": "responsibility"
          },
          {
            "id": "J9",
            "text": "and sponsor/vendor/cross-functional relationships.",
            "kind": "responsibility"
          },
          {
            "id": "J10",
            "text": "The Level 2 profile requires at least two years in a CTM position at a CRO",
            "kind": "mandatory"
          },
          {
            "id": "J11",
            "text": "a relevant bachelor's degree and at least eight years of relevant experience.",
            "kind": "mandatory"
          },
          {
            "id": "J12",
            "text": "Two years of monitoring is strongly preferred.",
            "kind": "preferred"
          },
          {
            "id": "J13",
            "text": "Complex or global trial management",
            "kind": "preferred"
          },
          {
            "id": "J14",
            "text": "start-up through database-lock experience and mentoring other CTMs are preferred.",
            "kind": "preferred"
          },
          {
            "id": "J15",
            "text": "Evaluate mandatory versus preferred criteria separately.",
            "kind": "context"
          },
          {
            "id": "J16",
            "text": "Associate CTM duties must not automatically be treated as two years of qualifying CTM ownership.",
            "kind": "context"
          },
          {
            "id": "J17",
            "text": "Exact eligibility, vacancy status and title equivalence require employer confirmation.",
            "kind": "context"
          }
        ],
        "candidates": [
          {
            "id": "C1",
            "text": "FICTIONAL QA CANDIDATE — not a real person."
          },
          {
            "id": "C2",
            "text": "Candidate B."
          },
          {
            "id": "C3",
            "text": "BSc Nursing and MSc Clinical Research."
          },
          {
            "id": "C4",
            "text": "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO."
          },
          {
            "id": "C5",
            "text": "Supported a Phase III U.S. cardiometabolic study across 24 sites."
          },
          {
            "id": "C6",
            "text": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries."
          },
          {
            "id": "C7",
            "text": "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts."
          },
          {
            "id": "C8",
            "text": "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied."
          },
          {
            "id": "C9",
            "text": "Candidate reports U.S. work authorization."
          },
          {
            "id": "C10",
            "text": "All metrics describe fictional scope, not performance improvements."
          },
          {
            "id": "C11",
            "text": "No claimed inspection or hiring outcomes."
          }
        ]
      },
      "sourceChecks": [
        {
          "url": "https://careers.iconplc.com/job/clinical-trial-manager-ii-biotech-united-states-remote-in-regional-united-states-pra-jid-36419",
          "finalURL": "https://careers.iconplc.com/job/clinical-trial-manager-ii-biotech-united-states-remote-in-regional-united-states-pra-jid-36419",
          "status": "inaccessible",
          "httpStatus": 404,
          "reason": "Source did not return HTTP 200.",
          "id": "S1",
          "checkedAt": "2026-10-29T02:15:35.913Z",
          "kind": "target_job",
          "employerDomainMatch": true
        },
        {
          "url": "https://www.iconplc.com/privacy/business-professionals",
          "finalURL": "https://www.iconplc.com/privacy/business-professionals",
          "status": "available",
          "title": "Business Professionals | ICON",
          "contentSHA256": "0d9197993c67fffaa86241aeed98a31f3bb7af53d86b57a5d38bd6f4b5eb3b94",
          "id": "S2",
          "checkedAt": "2026-10-29T02:15:36.465Z",
          "kind": "employer_context",
          "employerDomainMatch": true
        }
      ],
      "policy": null,
      "researchGaps": [
        "S1: https://careers.iconplc.com/job/clinical-trial-manager-ii-biotech-united-states-remote-in-regional-united-states-pra-jid-36419 — inaccessible. Not used as verified evidence.",
        "A public applicant AI-use policy could not be verified. This does not establish that no policy exists."
      ],
      "telemetry": {
        "durationMs": 41603,
        "calls": [
          {
            "stage": "research",
            "model": "openai/gpt-5-mini",
            "requestStarted": "2026-10-29T02:15:19.799Z",
            "responseID": "gen_01M62Q1EG6HR9JTFA4411BRRH6",
            "inputTokens": 13486,
            "outputTokens": 1452,
            "durationMs": 15819
          },
          {
            "stage": "synthesis",
            "model": "openai/gpt-5-mini",
            "requestStarted": "2026-10-29T02:15:36.466Z",
            "responseID": "gen_01M62Q1YS153R5GQM208Y0XX55",
            "inputTokens": 5481,
            "outputTokens": 2458,
            "durationMs": 24934
          }
        ],
        "costUSD": null,
        "costNote": "Token usage is recorded when supplied. Tool and provider charges require reconciliation with Gateway billing."
      }
    },
    "baseline": "ICON — Clinical Trial Manager II, Biotech — United States, Remote\nBrief, evidence-based interview preparation (max 850 words)\n\nSources inspected\n- ICON job paraphrase JR121420 (supplied): responsibilities and selection criteria summarized from employer material (see J1–J16).\n- ICON privacy/business-professionals page (available): notes ICON’s use of data and explicitly lists use of AI/ML in business processes (S2). \n- Note: the direct job posting URL (provided) was inaccessible during inspection; exact vacancy text/status/title equivalence require employer confirmation (S1 inaccessible).\n\nMandatory vs Preferred (as stated by employer)\n- Mandatory (per employer paraphrase): \n  - Minimum two years in a CTM position at a CRO (J10). \n  - Relevant bachelor’s degree and at least eight years’ relevant experience (J11).\n- Preferred (employer-described): \n  - Two years of monitoring experience is strongly preferred (J12). \n  - Experience managing complex or global trials (J13). \n  - Start-up through database-lock ownership and mentoring other CTMs (J14).\n- Important interpretive rule from employer: Associate CTM duties do not automatically count as two years of CTM ownership (J16). Confirm eligibility/title with ICON (J17).\n\nKey employer site/CRO/sponsor scope and responsibilities (from job evidence)\n- Typical Level 2 CTM duties include: clinical budget oversight, monitoring plans, CRA training/mentoring, study start‑up and enrollment timelines, trip‑report review, CAPAs, and sponsor/vendor/cross‑functional relationships (J3–J9).\n- ICON’s corporate materials acknowledge use of AI/ML for business processes; respect any ICON applicant AI policy and data-privacy processes described on their site (S2).\n\nThree critical findings (fact vs interpretation)\n1) Fact: Candidate lacks the mandatory CTM tenure. Candidate = 18 months Associate CTM; employer requires ≥2 years CTM at a CRO and cautions against treating Associate CTM time automatically as qualifying (C4; J10, J16). \n   Interpretation: This is the single largest eligibility risk; hiring teams may consider title-specific ownership and independent study leadership.\n2) Fact: Candidate meets the degree and total experience threshold (BSc + MSc; total ~8.5 yrs across CRC/CRA/Assoc CTM) (C3, C4; J11). \n   Interpretation: Total experience is borderline-sufficient for the eight-year rule but CTM-specific tenure shortfall remains critical.\n3) Fact: Candidate has monitoring experience (3 years as CRA) and direct operational experience supporting a Phase III U.S. cardiometabolic study, including trip‑report review and trackers, but did not own budgets, DB locks, or mentor CTMs (C5–C8; J3–J9, J12–J14). \n   Interpretation: Strong operational grounding for monitoring/oversight tasks, but lacks independent end‑to‑end trial ownership and budget/mentoring evidence that ICON prefers.\n\nHonest strengths and gaps (employer-specific)\n- Strengths:\n  - Clinical operations background across site and CRO environments (CRC + CRA + Associate CTM) — relevant to ICON’s cross‑functional interactions (C4–C6; J9).\n  - Direct monitoring experience (meets preferred monitoring experience) and Phase III U.S. trial exposure (C5; J12).\n  - Familiar with trip reports, risk/enrollment trackers and CRA coordination—tasks called out in ICON responsibilities (C6; J7).\n- Gaps:\n  - Not meeting 2 years CTM ownership (mandatory) and no independent budget ownership or contract negotiation experience (C7; J10, J3).\n  - No documented database-lock ownership, no mentoring of CTMs, and no independent global trial leadership (C8; J14).\n  - Unclear whether Associate CTM duties will be accepted as qualifying by ICON (risk per J16).\n\nEmployer-specific implications (how interviewers will read evidence)\n- Interviewers will probe for concrete CTM ownership examples: who held the budget sign‑off, who negotiated vendor contracts, and who drove DB lock. If the candidate cannot demonstrate independent ownership, they may be screened out despite relevant experience elsewhere.\n- Demonstrate monitoring depth: because ICON strongly prefers monitoring experience, the candidate should frame CRA years as examples of independent monitoring decisions, escalation, and mitigation that map to CTM responsibilities.\n- Expect targeted questions on mentoring and cross‑functional leadership; lacking examples should be mitigated by concrete plans and recent stretch-projects.\n\nRanked practical next actions (priority)\n1) Verify eligibility and vacancy specifics with ICON recruiter / job contact before interviewing—clarify whether Associate CTM (18 months) will be accepted against the 2‑year CTM requirement (J16, J17). \n2) Prepare 3–4 STAR stories emphasizing independent decision points from CRA/Assoc CTM roles: monitoring escalations, risk tracker actions that influenced timelines, and trip‑report conclusions (map to J4–J9). Quantify sites (24), timelines, and outcomes where possible (C5–C6).\n3) Build a remediation narrative for missing budget/DB‑lock/mentoring ownership: explain responsibilities performed, describe how you would have managed those tasks, and cite specific process knowledge (vendor contracting, budget change control, database-lock steps).\n4) Prepare targeted questions for the interviewer about ICON expectations for CTM II scope, mentoring responsibilities, and what counts as qualifying CTM time; and confirm ICON’s applicant AI usage policies if relevant (S2).\n\nPractice (3–4 personalized questions + conditional answer frameworks and evidence gaps)\n1) Practice Q: “Describe a time you led a monitoring escalation that changed study timelines.”\n   - Framework: Situation → Your assessment (data from trip/reports) → Action (who you engaged, decisions made) → Result (effect on enrollment/timeline). \n   - Evidence gaps to fill: show independent decision-making, quantify timeline impact, document cross-functional escalation.\n2) Practice Q: “How have you contributed to the clinical budget or managed cost risk?”\n   - Framework: Explain specific tracker inputs you owned, examples where you recommended changes, stakeholders engaged, and how you monitored forecasts. \n   - Evidence gap: no ownership—prepare a hypothetical correction you would have negotiated and cite contracting/budget process knowledge.\n3) Practice Q: “Give an example of mentoring or training a CRA.”\n   - Framework: Need → Action (training plan/tools/coaching) → Follow‑up metrics (quality, adherence). \n   - Evidence gap: no CTM mentoring—use CRA peer-training examples, and propose concrete mentoring structure you would implement.\n\nLimitations and compliance\n- The exact ICON job posting was inaccessible for verification; statements rely on the supplied JR121420 paraphrase (J1–J16). Confirm details with ICON. ICON’s privacy page indicates use of AI/ML in business processes—adhere to any posted applicant AI policies (S2).\n\nNo guarantees implied.",
    "stages": [
      {
        "stage": "research",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T02:15:19.799Z",
        "responseID": "gen_01M62Q1EG6HR9JTFA4411BRRH6",
        "inputTokens": 13486,
        "outputTokens": 1452,
        "durationMs": 15819,
        "status": "completed",
        "outputCharacters": 1717,
        "sourceURLs": 11,
        "incompleteReason": null
      },
      {
        "stage": "synthesis",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T02:15:36.466Z",
        "responseID": "gen_01M62Q1YS153R5GQM208Y0XX55",
        "inputTokens": 5481,
        "outputTokens": 2458,
        "durationMs": 24934,
        "status": "completed",
        "outputCharacters": 9843,
        "sourceURLs": 0,
        "incompleteReason": null
      },
      {
        "stage": "baseline",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T02:16:01.402Z",
        "responseID": "gen_01M62Q2Q4AHRP70PQ448H4P2TT",
        "inputTokens": 4434,
        "outputTokens": 1823,
        "durationMs": 17047,
        "status": "completed",
        "outputCharacters": 6898,
        "sourceURLs": 0,
        "incompleteReason": null
      }
    ],
    "note": "Actual one-attempt output text is unedited; review annotations are added. Current deterministic checks replayed locally without model calls. Semantic defects remain; neither product is approved."
  }
];
