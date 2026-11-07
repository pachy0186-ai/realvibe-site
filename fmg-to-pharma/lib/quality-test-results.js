// Fictional QA only; final feasibility, human review pending.
export const qualityTestReports = [
  {
    "case": "CRA",
    "packageId": "application",
    "draft": {
      "engineVersion": "0.4.0-evidence-first",
      "analysis": {
        "target": {
          "company": "ICON",
          "role": "CRA II and Senior CRA"
        },
        "executive_verdict": {
          "recommendation": "Clarify eligibility first",
          "competitiveness": "Not scored as a hiring probability",
          "summary": "Clarify eligibility and evidence before relying on this assessment. The report separates supplied evidence from unverified scope, duration and employer acceptance.",
          "reasons_for": [],
          "reasons_against": []
        },
        "critical_findings": [
          {
            "heading": "Independent monitoring duration needs confirmation",
            "interpretation": "CRA role tenure is 18 stated months; independent monitoring duration is not quantified. A CRA title or CRC coordination period does not establish the 12-month independent-monitoring minimum.",
            "references": {
              "job_ids": [
                "J9"
              ],
              "candidate_ids": [
                "C4",
                "C5"
              ]
            }
          },
          {
            "heading": "Travel availability needs confirmation",
            "interpretation": "Travel availability is not established when the intake leaves it unspecified. Work authorization is a separate question.",
            "references": {
              "job_ids": [
                "J11"
              ],
              "candidate_ids": [
                "C10"
              ]
            }
          },
          {
            "heading": "Qualification-visit ownership is not established",
            "interpretation": "Independent site qualification ownership needs explicit evidence; routine visits do not establish it.",
            "references": {
              "job_ids": [
                "J1"
              ],
              "candidate_ids": [
                "C6"
              ]
            }
          }
        ],
        "decision_drivers": [
          {
            "requirement": "The posting requests a relevant bachelor's degree",
            "jd_evidence": "The posting requests a relevant bachelor's degree",
            "classification": "mandatory"
          },
          {
            "requirement": "at least one year of independent monitoring experience",
            "jd_evidence": "at least one year of independent monitoring experience",
            "classification": "mandatory"
          },
          {
            "requirement": "ICH-GCP knowledge.",
            "jd_evidence": "ICH-GCP knowledge.",
            "classification": "mandatory"
          },
          {
            "requirement": "Approximately 60 percent travel is indicated.",
            "jd_evidence": "Approximately 60 percent travel is indicated.",
            "classification": "constraint"
          },
          {
            "requirement": "Responsibilities include site monitoring across qualification",
            "jd_evidence": "Responsibilities include site monitoring across qualification",
            "classification": "responsibility"
          },
          {
            "requirement": "initiation",
            "jd_evidence": "initiation",
            "classification": "responsibility"
          }
        ],
        "evidence_map": [
          {
            "id": "K8",
            "jobId": "J8",
            "driver": "The posting requests a relevant bachelor's degree",
            "classification": "mandatory",
            "candidate_evidence": "BSc Biology.",
            "candidate_quotes": [
              "BSc Biology."
            ],
            "strength": "strong",
            "gap_type": "none",
            "risk": "A degree is reported in the intake. Credential equivalence and the employer’s acceptance remain unverified.",
            "action": "Check the stated degree requirement against the exact credential and any employer equivalence guidance."
          },
          {
            "id": "K9",
            "jobId": "J9",
            "driver": "at least one year of independent monitoring experience",
            "classification": "mandatory",
            "candidate_evidence": "Two years as a site Clinical Research Coordinator, followed by 18 months as a CRO Clinical Research Associate. Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials.",
            "candidate_quotes": [
              "Two years as a site Clinical Research Coordinator, followed by 18 months as a CRO Clinical Research Associate.",
              "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials."
            ],
            "strength": "missing",
            "gap_type": "evidence_gap",
            "risk": "CRA role tenure is 18 stated months; independent monitoring duration is not quantified. A CRA title or CRC coordination period does not establish the 12-month independent-monitoring minimum.",
            "action": "Document the start/end dates and independently performed visit types; count independent monitoring months separately from CRC and CRA job tenure."
          },
          {
            "id": "K10",
            "jobId": "J10",
            "driver": "ICH-GCP knowledge.",
            "classification": "mandatory",
            "candidate_evidence": "ICH-GCP training listed.",
            "candidate_quotes": [
              "ICH-GCP training listed."
            ],
            "strength": "partial",
            "gap_type": "evidence_gap",
            "risk": "Training, applied GCP judgment and independent monitoring are different types of evidence. A listed course does not establish a certification or a decision-making example.",
            "action": "If available, prepare a deidentified example of an actual protocol or documentation decision; leave outcomes unquantified when not supplied."
          },
          {
            "id": "K11",
            "jobId": "J11",
            "driver": "Approximately 60 percent travel is indicated.",
            "classification": "constraint",
            "candidate_evidence": "Travel availability and work authorization are not supplied.",
            "candidate_quotes": [
              "Travel availability and work authorization are not supplied."
            ],
            "strength": "missing",
            "gap_type": "evidence_gap",
            "risk": "Travel availability is not established when the intake leaves it unspecified. Work authorization is a separate question.",
            "action": "Confirm the stated travel expectation and report personal availability accurately."
          },
          {
            "id": "K1",
            "jobId": "J1",
            "driver": "Responsibilities include site monitoring across qualification",
            "classification": "responsibility",
            "candidate_evidence": "Supported one close-out visit; no independent site qualification or initiation documented.",
            "candidate_quotes": [
              "Supported one close-out visit; no independent site qualification or initiation documented."
            ],
            "strength": "missing",
            "gap_type": "evidence_gap",
            "risk": "Independent site qualification ownership needs explicit evidence; routine visits do not establish it.",
            "action": "If applicable, describe personal qualification-visit responsibilities without providing confidential trial records."
          },
          {
            "id": "K2",
            "jobId": "J2",
            "driver": "initiation",
            "classification": "responsibility",
            "candidate_evidence": "Supported one close-out visit; no independent site qualification or initiation documented.",
            "candidate_quotes": [
              "Supported one close-out visit; no independent site qualification or initiation documented."
            ],
            "strength": "missing",
            "gap_type": "evidence_gap",
            "risk": "Independent site initiation ownership needs explicit evidence; coordination or routine monitoring does not establish it.",
            "action": "Confirm whether initiation visits were supported or independently conducted, using deidentified descriptions."
          }
        ],
        "company_intelligence": [
          {
            "factId": "E1",
            "finding": "The inspected exact target posting states an independent-monitoring minimum.",
            "source_quote": "Minimum of 1 year of independent monitoring experience.",
            "why_it_matters": "Confirm actual independent-monitoring dates instead of substituting CRA or CRC role tenure.",
            "provenance": "verified_public",
            "source_urls": [
              "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448"
            ],
            "source_id": "S1"
          },
          {
            "factId": "E2",
            "finding": "The inspected exact target posting states a travel expectation.",
            "source_quote": "Willingness to travel as required (approximately 60%)",
            "why_it_matters": "Check personal travel availability against the exact opportunity before applying.",
            "provenance": "verified_public",
            "source_urls": [
              "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448"
            ],
            "source_id": "S1"
          },
          {
            "factId": "E3",
            "finding": "The inspected applicant AI policy restricts misrepresentation of skills or experience.",
            "source_quote": "inaccurately portrays one's skills, experiences, or qualifications",
            "why_it_matters": "Use only supported responsibilities in preparation and read the full policy, including its conditions on generated application material and live assistance.",
            "provenance": "verified_public",
            "source_urls": [
              "https://careers.iconplc.com/ai-usage-policy-for-job-applicants"
            ],
            "source_id": "S2"
          }
        ],
        "positioning_strategy": {
          "headline": "Act on the evidence before expanding the claim.",
          "top_changes": [
            {
              "ruleId": "K9",
              "change": "Document the start/end dates and independently performed visit types; count independent monitoring months separately from CRC and CRA job tenure.",
              "why": "The screening criterion measures independent monitoring, not time holding a CRA title.",
              "references": {
                "job_ids": [
                  "J9"
                ],
                "candidate_ids": [
                  "C4",
                  "C5"
                ]
              }
            },
            {
              "ruleId": "K11",
              "change": "Confirm the stated travel expectation and report personal availability accurately.",
              "why": "The stated travel constraint and personal availability need to align.",
              "references": {
                "job_ids": [
                  "J11"
                ],
                "candidate_ids": [
                  "C10"
                ]
              }
            },
            {
              "ruleId": "K1",
              "change": "If applicable, describe personal qualification-visit responsibilities without providing confidential trial records.",
              "why": "Visit-type ownership needs its own evidence.",
              "references": {
                "job_ids": [
                  "J1"
                ],
                "candidate_ids": [
                  "C6"
                ]
              }
            },
            {
              "ruleId": "K2",
              "change": "Confirm whether initiation visits were supported or independently conducted, using deidentified descriptions.",
              "why": "Visit-type ownership needs its own evidence.",
              "references": {
                "job_ids": [
                  "J2"
                ],
                "candidate_ids": [
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
            "question": "Document the start/end dates and independently performed visit types; count independent monitoring months separately from CRC and CRA job tenure.",
            "why_needed": "This decision could change the application or preparation strategy.",
            "impact": "Confirm before making the associated claim."
          },
          {
            "question": "Confirm the stated travel expectation and report personal availability accurately.",
            "why_needed": "This decision could change the application or preparation strategy.",
            "impact": "Confirm before making the associated claim."
          },
          {
            "question": "If applicable, describe personal qualification-visit responsibilities without providing confidential trial records.",
            "why_needed": "This decision could change the application or preparation strategy.",
            "impact": "Confirm before making the associated claim."
          }
        ],
        "source_index": [
          {
            "url": "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448",
            "title": "CRA II and Senior CRA job in Regional United States (PRA) | ICON",
            "type": "target_job",
            "date": "Access checked 2026-10-29T11:51:03.162Z; publication date not independently established"
          },
          {
            "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
            "title": "ICON Plc: AI Usage Policy for Job Applicants",
            "type": "applicant_ai_policy",
            "date": "Access checked 2026-10-29T11:51:03.386Z; publication date not independently established"
          }
        ],
        "quality_notes": [
          "Candidate facts are self-reported intake evidence, not independent verification of employment.",
          "The supplied JD is preserved. Public posting status, credential acceptance and title equivalence are separate questions.",
          "Clinical interpretations and practice plans are rules-based suggestions requiring human clinical review."
        ]
      },
      "qualityFlags": [],
      "requiresFounderReview": true,
      "researchedAt": "2026-10-29T11:51:07.921Z",
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
            "text": "Responsibilities include site monitoring across qualification",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams.",
            "competency": "qualification_visit",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J2",
            "text": "initiation",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams.",
            "competency": "initiation_visit",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J3",
            "text": "routine monitoring",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams.",
            "competency": "routine_monitoring",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J4",
            "text": "close-out",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams.",
            "competency": "closeout",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J5",
            "text": "checking protocol and GCP adherence",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams.",
            "competency": "gcp",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J6",
            "text": "reviewing trial records and data quality",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams.",
            "competency": "data_quality",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J7",
            "text": "maintaining clinical-trial systems and collaborating with site teams.",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams.",
            "competency": "systems",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J8",
            "text": "The posting requests a relevant bachelor's degree",
            "classification": "mandatory",
            "sourceSentence": "The posting requests a relevant bachelor's degree, at least one year of independent monitoring experience and ICH-GCP knowledge.",
            "competency": "education",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "mandatory"
          },
          {
            "id": "J9",
            "text": "at least one year of independent monitoring experience",
            "classification": "mandatory",
            "sourceSentence": "The posting requests a relevant bachelor's degree, at least one year of independent monitoring experience and ICH-GCP knowledge.",
            "competency": "independent_monitoring_tenure",
            "minimumMonths": 12,
            "provenance": "supplied_job_description",
            "kind": "mandatory"
          },
          {
            "id": "J10",
            "text": "ICH-GCP knowledge.",
            "classification": "mandatory",
            "sourceSentence": "The posting requests a relevant bachelor's degree, at least one year of independent monitoring experience and ICH-GCP knowledge.",
            "competency": "gcp",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "mandatory"
          },
          {
            "id": "J11",
            "text": "Approximately 60 percent travel is indicated.",
            "classification": "constraint",
            "sourceSentence": "Approximately 60 percent travel is indicated.",
            "competency": "travel",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "constraint"
          }
        ],
        "candidates": [
          {
            "id": "C1",
            "text": "FICTIONAL QA CANDIDATE — not a real person.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C2",
            "text": "Candidate A.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C3",
            "text": "BSc Biology.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C4",
            "text": "Two years as a site Clinical Research Coordinator, followed by 18 months as a CRO Clinical Research Associate.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C5",
            "text": "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C6",
            "text": "Supported one close-out visit; no independent site qualification or initiation documented.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C7",
            "text": "Tracked overdue queries with site staff and escalated a recurring documentation issue to a CTM.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C8",
            "text": "No measured reduction, inspection outcome, trial leadership or mentoring supplied.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C9",
            "text": "ICH-GCP training listed.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C10",
            "text": "Travel availability and work authorization are not supplied.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C11",
            "text": "Do not invent achievements or infer that CRC time is independent monitoring experience.",
            "provenance": "candidate_provided"
          }
        ]
      },
      "fullRequirementRegister": [
        {
          "id": "K1",
          "jobId": "J1",
          "driver": "Responsibilities include site monitoring across qualification",
          "classification": "responsibility",
          "candidate_evidence": "Supported one close-out visit; no independent site qualification or initiation documented.",
          "candidate_quotes": [
            "Supported one close-out visit; no independent site qualification or initiation documented."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "Independent site qualification ownership needs explicit evidence; routine visits do not establish it.",
          "action": "If applicable, describe personal qualification-visit responsibilities without providing confidential trial records."
        },
        {
          "id": "K2",
          "jobId": "J2",
          "driver": "initiation",
          "classification": "responsibility",
          "candidate_evidence": "Supported one close-out visit; no independent site qualification or initiation documented.",
          "candidate_quotes": [
            "Supported one close-out visit; no independent site qualification or initiation documented."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "Independent site initiation ownership needs explicit evidence; coordination or routine monitoring does not establish it.",
          "action": "Confirm whether initiation visits were supported or independently conducted, using deidentified descriptions."
        },
        {
          "id": "K3",
          "jobId": "J3",
          "driver": "routine monitoring",
          "classification": "responsibility",
          "candidate_evidence": "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials.",
          "candidate_quotes": [
            "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials."
          ],
          "strength": "strong",
          "gap_type": "none",
          "risk": "Routine monitoring activity is explicitly reported; its duration is a separate unresolved question.",
          "action": "State only the independently performed routine-monitoring work and supported scope."
        },
        {
          "id": "K4",
          "jobId": "J4",
          "driver": "close-out",
          "classification": "responsibility",
          "candidate_evidence": "Supported one close-out visit; no independent site qualification or initiation documented.",
          "candidate_quotes": [
            "Supported one close-out visit; no independent site qualification or initiation documented."
          ],
          "strength": "partial",
          "gap_type": "evidence_gap",
          "risk": "Close-out support is reported. It is not evidence of independent close-out ownership.",
          "action": "Distinguish assistance from independent visit responsibility."
        },
        {
          "id": "K5",
          "jobId": "J5",
          "driver": "checking protocol and GCP adherence",
          "classification": "responsibility",
          "candidate_evidence": "ICH-GCP training listed.",
          "candidate_quotes": [
            "ICH-GCP training listed."
          ],
          "strength": "partial",
          "gap_type": "evidence_gap",
          "risk": "Training, applied GCP judgment and independent monitoring are different types of evidence. A listed course does not establish a certification or a decision-making example.",
          "action": "If available, prepare a deidentified example of an actual protocol or documentation decision; leave outcomes unquantified when not supplied."
        },
        {
          "id": "K6",
          "jobId": "J6",
          "driver": "reviewing trial records and data quality",
          "classification": "responsibility",
          "candidate_evidence": "Tracked overdue queries with site staff and escalated a recurring documentation issue to a CTM.",
          "candidate_quotes": [
            "Tracked overdue queries with site staff and escalated a recurring documentation issue to a CTM."
          ],
          "strength": "partial",
          "gap_type": "evidence_gap",
          "risk": "Query/documentation activity can support a data-quality example. No performance improvement or inspection outcome is inferred.",
          "action": "Use only supplied scope and a real deidentified example; do not invent query reductions or inspection results."
        },
        {
          "id": "K7",
          "jobId": "J7",
          "driver": "maintaining clinical-trial systems and collaborating with site teams.",
          "classification": "responsibility",
          "candidate_evidence": "No supporting candidate excerpt is established.",
          "candidate_quotes": [],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "Specific clinical systems experience is not implied by a CRA title or query tracking.",
          "action": "Name systems and personal tasks only if actually used."
        },
        {
          "id": "K8",
          "jobId": "J8",
          "driver": "The posting requests a relevant bachelor's degree",
          "classification": "mandatory",
          "candidate_evidence": "BSc Biology.",
          "candidate_quotes": [
            "BSc Biology."
          ],
          "strength": "strong",
          "gap_type": "none",
          "risk": "A degree is reported in the intake. Credential equivalence and the employer’s acceptance remain unverified.",
          "action": "Check the stated degree requirement against the exact credential and any employer equivalence guidance."
        },
        {
          "id": "K9",
          "jobId": "J9",
          "driver": "at least one year of independent monitoring experience",
          "classification": "mandatory",
          "candidate_evidence": "Two years as a site Clinical Research Coordinator, followed by 18 months as a CRO Clinical Research Associate. Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials.",
          "candidate_quotes": [
            "Two years as a site Clinical Research Coordinator, followed by 18 months as a CRO Clinical Research Associate.",
            "Independently performed routine monitoring at six U.S. sites across two Phase III cardiometabolic trials."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "CRA role tenure is 18 stated months; independent monitoring duration is not quantified. A CRA title or CRC coordination period does not establish the 12-month independent-monitoring minimum.",
          "action": "Document the start/end dates and independently performed visit types; count independent monitoring months separately from CRC and CRA job tenure."
        },
        {
          "id": "K10",
          "jobId": "J10",
          "driver": "ICH-GCP knowledge.",
          "classification": "mandatory",
          "candidate_evidence": "ICH-GCP training listed.",
          "candidate_quotes": [
            "ICH-GCP training listed."
          ],
          "strength": "partial",
          "gap_type": "evidence_gap",
          "risk": "Training, applied GCP judgment and independent monitoring are different types of evidence. A listed course does not establish a certification or a decision-making example.",
          "action": "If available, prepare a deidentified example of an actual protocol or documentation decision; leave outcomes unquantified when not supplied."
        },
        {
          "id": "K11",
          "jobId": "J11",
          "driver": "Approximately 60 percent travel is indicated.",
          "classification": "constraint",
          "candidate_evidence": "Travel availability and work authorization are not supplied.",
          "candidate_quotes": [
            "Travel availability and work authorization are not supplied."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "Travel availability is not established when the intake leaves it unspecified. Work authorization is a separate question.",
          "action": "Confirm the stated travel expectation and report personal availability accurately."
        }
      ],
      "durationSummary": {
        "listedRoleMonths": 42,
        "listedRoleYears": 3.5,
        "independentMonitoringMonths": null,
        "qualifyingCtmMonths": null,
        "caveat": "The arithmetic sums stated role durations only. Overlaps, employer relevance, independent monitoring duration and qualifying CTM tenure require separate confirmation."
      },
      "sourceChecks": [
        {
          "url": "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448",
          "finalURL": "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448",
          "status": "available",
          "title": "CRA II and Senior CRA job in Regional United States (PRA) | ICON",
          "contentSHA256": "2097ce0d8192ac0865d53367b78d6441309c3885deeb9e26c893f296d8ae2c2f",
          "id": "S1",
          "checkedAt": "2026-10-29T11:51:03.162Z",
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
          "checkedAt": "2026-10-29T11:51:03.386Z",
          "kind": "applicant_ai_policy",
          "employerDomainMatch": true
        }
      ],
      "researchGaps": [],
      "policy": {
        "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants"
      },
      "method": "Separate exact extraction, source inspection, versioned clinical rules, model ranking, deterministic compilation and independent claim checks. The model supplies IDs only, not factual prose.",
      "claimAudit": [
        {
          "id": "target",
          "type": "target",
          "text": {
            "company": "ICON",
            "role": "CRA II and Senior CRA"
          },
          "passed": true,
          "evidence": {
            "company": "ICON",
            "role": "CRA II and Senior CRA"
          },
          "limitation": ""
        },
        {
          "id": "jd-hash",
          "type": "input_integrity",
          "text": "f252815acdcb8e882a0202f0693236b1593054767904d9b1961069df7ac9570b",
          "passed": true,
          "evidence": {
            "original": "supplied JD"
          },
          "limitation": ""
        },
        {
          "id": "cv-hash",
          "type": "input_integrity",
          "text": "b5374d79edf255dd2bc57cef15beb6664d224438c725bf9b3540971557a3525f",
          "passed": true,
          "evidence": {
            "original": "supplied CV"
          },
          "limitation": ""
        },
        {
          "id": "decision-text",
          "type": "registered_recommendation",
          "text": {
            "recommendation": "Clarify eligibility first",
            "competitiveness": "Not scored as a hiring probability",
            "summary": "Clarify eligibility and evidence before relying on this assessment. The report separates supplied evidence from unverified scope, duration and employer acceptance.",
            "reasons_for": [],
            "reasons_against": []
          },
          "passed": true,
          "evidence": {
            "registry": "CAREER_DECISION"
          },
          "limitation": ""
        },
        {
          "id": "J1",
          "type": "job_requirement",
          "text": "Responsibilities include site monitoring across qualification",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J2",
          "type": "job_requirement",
          "text": "initiation",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J3",
          "type": "job_requirement",
          "text": "routine monitoring",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J4",
          "type": "job_requirement",
          "text": "close-out",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J5",
          "type": "job_requirement",
          "text": "checking protocol and GCP adherence",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J6",
          "type": "job_requirement",
          "text": "reviewing trial records and data quality",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J7",
          "type": "job_requirement",
          "text": "maintaining clinical-trial systems and collaborating with site teams.",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include site monitoring across qualification, initiation, routine monitoring and close-out, checking protocol and GCP adherence, reviewing trial records and data quality, maintaining clinical-trial systems and collaborating with site teams."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J8",
          "type": "job_requirement",
          "text": "The posting requests a relevant bachelor's degree",
          "passed": true,
          "evidence": {
            "classification": "mandatory",
            "sourceSentence": "The posting requests a relevant bachelor's degree, at least one year of independent monitoring experience and ICH-GCP knowledge."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J9",
          "type": "job_requirement",
          "text": "at least one year of independent monitoring experience",
          "passed": true,
          "evidence": {
            "classification": "mandatory",
            "sourceSentence": "The posting requests a relevant bachelor's degree, at least one year of independent monitoring experience and ICH-GCP knowledge."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J10",
          "type": "job_requirement",
          "text": "ICH-GCP knowledge.",
          "passed": true,
          "evidence": {
            "classification": "mandatory",
            "sourceSentence": "The posting requests a relevant bachelor's degree, at least one year of independent monitoring experience and ICH-GCP knowledge."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J11",
          "type": "job_requirement",
          "text": "Approximately 60 percent travel is indicated.",
          "passed": true,
          "evidence": {
            "classification": "constraint",
            "sourceSentence": "Approximately 60 percent travel is indicated."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "T1",
          "type": "reported_role_duration",
          "text": "Two years as a site Clinical Research Coordinator",
          "passed": true,
          "evidence": {
            "value": 2,
            "unit": "years",
            "months": 24,
            "family": "crc"
          },
          "limitation": "Job-title tenure is not independent-monitoring or qualifying CTM tenure."
        },
        {
          "id": "T2",
          "type": "reported_role_duration",
          "text": "18 months as a CRO Clinical Research Associate.",
          "passed": true,
          "evidence": {
            "value": 18,
            "unit": "months",
            "months": 18,
            "family": "cra"
          },
          "limitation": "Job-title tenure is not independent-monitoring or qualifying CTM tenure."
        },
        {
          "id": "sum",
          "type": "derived_arithmetic",
          "text": "42 stated months / 12 = 3.5 years",
          "passed": true,
          "evidence": {
            "operands": [
              "T1",
              "T2"
            ]
          },
          "limitation": "Overlaps and employer relevance are unverified."
        },
        {
          "id": "displayed-duration-summary",
          "type": "derived_arithmetic",
          "text": {
            "listedRoleMonths": 42,
            "listedRoleYears": 3.5,
            "independentMonitoringMonths": null,
            "qualifyingCtmMonths": null,
            "caveat": "The arithmetic sums stated role durations only. Overlaps, employer relevance, independent monitoring duration and qualifying CTM tenure require separate confirmation."
          },
          "passed": true,
          "evidence": {
            "source": "validated role-duration operands"
          },
          "limitation": ""
        },
        {
          "id": "independent-duration",
          "type": "unknown",
          "text": null,
          "passed": true,
          "evidence": {
            "reason": "No explicitly quantified independent monitoring period."
          },
          "limitation": ""
        },
        {
          "id": "qualifying-ctm-duration",
          "type": "unknown",
          "text": null,
          "passed": true,
          "evidence": {
            "reason": "No employer-confirmed qualifying CTM tenure is supplied."
          },
          "limitation": ""
        },
        {
          "id": "K1",
          "type": "clinical_interpretation",
          "text": "Independent site qualification ownership needs explicit evidence; routine visits do not establish it.",
          "passed": true,
          "evidence": {
            "jobId": "J1",
            "classification": "responsibility",
            "candidateIds": [
              "C6"
            ],
            "rule": "qualification_visit"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K2",
          "type": "clinical_interpretation",
          "text": "Independent site initiation ownership needs explicit evidence; coordination or routine monitoring does not establish it.",
          "passed": true,
          "evidence": {
            "jobId": "J2",
            "classification": "responsibility",
            "candidateIds": [
              "C6"
            ],
            "rule": "initiation_visit"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K3",
          "type": "clinical_interpretation",
          "text": "Routine monitoring activity is explicitly reported; its duration is a separate unresolved question.",
          "passed": true,
          "evidence": {
            "jobId": "J3",
            "classification": "responsibility",
            "candidateIds": [
              "C5"
            ],
            "rule": "routine_monitoring"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K4",
          "type": "clinical_interpretation",
          "text": "Close-out support is reported. It is not evidence of independent close-out ownership.",
          "passed": true,
          "evidence": {
            "jobId": "J4",
            "classification": "responsibility",
            "candidateIds": [
              "C6"
            ],
            "rule": "closeout"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K5",
          "type": "clinical_interpretation",
          "text": "Training, applied GCP judgment and independent monitoring are different types of evidence. A listed course does not establish a certification or a decision-making example.",
          "passed": true,
          "evidence": {
            "jobId": "J5",
            "classification": "responsibility",
            "candidateIds": [
              "C9"
            ],
            "rule": "gcp"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K6",
          "type": "clinical_interpretation",
          "text": "Query/documentation activity can support a data-quality example. No performance improvement or inspection outcome is inferred.",
          "passed": true,
          "evidence": {
            "jobId": "J6",
            "classification": "responsibility",
            "candidateIds": [
              "C7"
            ],
            "rule": "data_quality"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K7",
          "type": "clinical_interpretation",
          "text": "Specific clinical systems experience is not implied by a CRA title or query tracking.",
          "passed": true,
          "evidence": {
            "jobId": "J7",
            "classification": "responsibility",
            "candidateIds": [],
            "rule": "systems"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K8",
          "type": "clinical_interpretation",
          "text": "A degree is reported in the intake. Credential equivalence and the employer’s acceptance remain unverified.",
          "passed": true,
          "evidence": {
            "jobId": "J8",
            "classification": "mandatory",
            "candidateIds": [
              "C3"
            ],
            "rule": "education"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K9",
          "type": "clinical_interpretation",
          "text": "CRA role tenure is 18 stated months; independent monitoring duration is not quantified. A CRA title or CRC coordination period does not establish the 12-month independent-monitoring minimum.",
          "passed": true,
          "evidence": {
            "jobId": "J9",
            "classification": "mandatory",
            "candidateIds": [
              "C4",
              "C5"
            ],
            "rule": "independent_monitoring_tenure"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K10",
          "type": "clinical_interpretation",
          "text": "Training, applied GCP judgment and independent monitoring are different types of evidence. A listed course does not establish a certification or a decision-making example.",
          "passed": true,
          "evidence": {
            "jobId": "J10",
            "classification": "mandatory",
            "candidateIds": [
              "C9"
            ],
            "rule": "gcp"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K11",
          "type": "clinical_interpretation",
          "text": "Travel availability is not established when the intake leaves it unspecified. Work authorization is a separate question.",
          "passed": true,
          "evidence": {
            "jobId": "J11",
            "classification": "constraint",
            "candidateIds": [
              "C10"
            ],
            "rule": "travel"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "E1",
          "type": "employer_fact",
          "text": "The inspected exact target posting states an independent-monitoring minimum.",
          "passed": true,
          "evidence": {
            "sourceId": "S1",
            "url": "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448",
            "contentSHA256": "2097ce0d8192ac0865d53367b78d6441309c3885deeb9e26c893f296d8ae2c2f",
            "quote": "Minimum of 1 year of independent monitoring experience.",
            "checkedAt": "2026-10-29T11:51:03.162Z"
          },
          "limitation": "An excerpt supports its limited claim, not private hiring practices."
        },
        {
          "id": "E2",
          "type": "employer_fact",
          "text": "The inspected exact target posting states a travel expectation.",
          "passed": true,
          "evidence": {
            "sourceId": "S1",
            "url": "https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448",
            "contentSHA256": "2097ce0d8192ac0865d53367b78d6441309c3885deeb9e26c893f296d8ae2c2f",
            "quote": "Willingness to travel as required (approximately 60%)",
            "checkedAt": "2026-10-29T11:51:03.162Z"
          },
          "limitation": "An excerpt supports its limited claim, not private hiring practices."
        },
        {
          "id": "E3",
          "type": "employer_fact",
          "text": "The inspected applicant AI policy restricts misrepresentation of skills or experience.",
          "passed": true,
          "evidence": {
            "sourceId": "S2",
            "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
            "contentSHA256": "a596967ad5c06d780412f876f6e44b326a6a938a3dde1d1f95f87d18d0c8ee1c",
            "quote": "inaccurately portrays one's skills, experiences, or qualifications",
            "checkedAt": "2026-10-29T11:51:03.386Z"
          },
          "limitation": "An excerpt supports its limited claim, not private hiring practices."
        },
        {
          "id": "displayed-employer-1",
          "type": "compiled_employer_claim",
          "text": "The inspected exact target posting states an independent-monitoring minimum.",
          "passed": true,
          "evidence": {
            "factId": "E1"
          },
          "limitation": ""
        },
        {
          "id": "displayed-employer-2",
          "type": "compiled_employer_claim",
          "text": "The inspected exact target posting states a travel expectation.",
          "passed": true,
          "evidence": {
            "factId": "E2"
          },
          "limitation": ""
        },
        {
          "id": "displayed-employer-3",
          "type": "compiled_employer_claim",
          "text": "The inspected applicant AI policy restricts misrepresentation of skills or experience.",
          "passed": true,
          "evidence": {
            "factId": "E3"
          },
          "limitation": ""
        },
        {
          "id": "finding-1",
          "type": "compiled_interpretation",
          "text": "CRA role tenure is 18 stated months; independent monitoring duration is not quantified. A CRA title or CRC coordination period does not establish the 12-month independent-monitoring minimum.",
          "passed": true,
          "evidence": {
            "ruleId": "K9"
          },
          "limitation": ""
        },
        {
          "id": "finding-2",
          "type": "compiled_interpretation",
          "text": "Travel availability is not established when the intake leaves it unspecified. Work authorization is a separate question.",
          "passed": true,
          "evidence": {
            "ruleId": "K11"
          },
          "limitation": ""
        },
        {
          "id": "finding-3",
          "type": "compiled_interpretation",
          "text": "Independent site qualification ownership needs explicit evidence; routine visits do not establish it.",
          "passed": true,
          "evidence": {
            "ruleId": "K1"
          },
          "limitation": ""
        },
        {
          "id": "display-K8",
          "type": "displayed_evidence",
          "text": "The posting requests a relevant bachelor's degree",
          "passed": true,
          "evidence": {
            "jobId": "J8",
            "candidateIds": [
              "C3"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K9",
          "type": "displayed_evidence",
          "text": "at least one year of independent monitoring experience",
          "passed": true,
          "evidence": {
            "jobId": "J9",
            "candidateIds": [
              "C4",
              "C5"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K10",
          "type": "displayed_evidence",
          "text": "ICH-GCP knowledge.",
          "passed": true,
          "evidence": {
            "jobId": "J10",
            "candidateIds": [
              "C9"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K11",
          "type": "displayed_evidence",
          "text": "Approximately 60 percent travel is indicated.",
          "passed": true,
          "evidence": {
            "jobId": "J11",
            "candidateIds": [
              "C10"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K1",
          "type": "displayed_evidence",
          "text": "Responsibilities include site monitoring across qualification",
          "passed": true,
          "evidence": {
            "jobId": "J1",
            "candidateIds": [
              "C6"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K2",
          "type": "displayed_evidence",
          "text": "initiation",
          "passed": true,
          "evidence": {
            "jobId": "J2",
            "candidateIds": [
              "C6"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K1",
          "type": "displayed_evidence",
          "text": "Responsibilities include site monitoring across qualification",
          "passed": true,
          "evidence": {
            "jobId": "J1",
            "candidateIds": [
              "C6"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K2",
          "type": "displayed_evidence",
          "text": "initiation",
          "passed": true,
          "evidence": {
            "jobId": "J2",
            "candidateIds": [
              "C6"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K3",
          "type": "displayed_evidence",
          "text": "routine monitoring",
          "passed": true,
          "evidence": {
            "jobId": "J3",
            "candidateIds": [
              "C5"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K4",
          "type": "displayed_evidence",
          "text": "close-out",
          "passed": true,
          "evidence": {
            "jobId": "J4",
            "candidateIds": [
              "C6"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K5",
          "type": "displayed_evidence",
          "text": "checking protocol and GCP adherence",
          "passed": true,
          "evidence": {
            "jobId": "J5",
            "candidateIds": [
              "C9"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K6",
          "type": "displayed_evidence",
          "text": "reviewing trial records and data quality",
          "passed": true,
          "evidence": {
            "jobId": "J6",
            "candidateIds": [
              "C7"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K7",
          "type": "displayed_evidence",
          "text": "maintaining clinical-trial systems and collaborating with site teams.",
          "passed": true,
          "evidence": {
            "jobId": "J7",
            "candidateIds": []
          },
          "limitation": ""
        },
        {
          "id": "display-K8",
          "type": "displayed_evidence",
          "text": "The posting requests a relevant bachelor's degree",
          "passed": true,
          "evidence": {
            "jobId": "J8",
            "candidateIds": [
              "C3"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K9",
          "type": "displayed_evidence",
          "text": "at least one year of independent monitoring experience",
          "passed": true,
          "evidence": {
            "jobId": "J9",
            "candidateIds": [
              "C4",
              "C5"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K10",
          "type": "displayed_evidence",
          "text": "ICH-GCP knowledge.",
          "passed": true,
          "evidence": {
            "jobId": "J10",
            "candidateIds": [
              "C9"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K11",
          "type": "displayed_evidence",
          "text": "Approximately 60 percent travel is indicated.",
          "passed": true,
          "evidence": {
            "jobId": "J11",
            "candidateIds": [
              "C10"
            ]
          },
          "limitation": ""
        },
        {
          "id": "action-1",
          "type": "registered_action",
          "text": "Document the start/end dates and independently performed visit types; count independent monitoring months separately from CRC and CRA job tenure.",
          "passed": true,
          "evidence": {
            "ruleId": "K9"
          },
          "limitation": ""
        },
        {
          "id": "action-2",
          "type": "registered_action",
          "text": "Confirm the stated travel expectation and report personal availability accurately.",
          "passed": true,
          "evidence": {
            "ruleId": "K11"
          },
          "limitation": ""
        },
        {
          "id": "action-3",
          "type": "registered_action",
          "text": "If applicable, describe personal qualification-visit responsibilities without providing confidential trial records.",
          "passed": true,
          "evidence": {
            "ruleId": "K1"
          },
          "limitation": ""
        },
        {
          "id": "action-4",
          "type": "registered_action",
          "text": "Confirm whether initiation visits were supported or independently conducted, using deidentified descriptions.",
          "passed": true,
          "evidence": {
            "ruleId": "K2"
          },
          "limitation": ""
        },
        {
          "id": "selection",
          "type": "recommendation_selection",
          "text": {
            "priority_ids": [
              "K9",
              "K11",
              "K1"
            ],
            "action_ids": [
              "K9",
              "K11",
              "K1",
              "K2"
            ],
            "practice_ids": []
          },
          "passed": true,
          "evidence": {
            "allowedCardIds": [
              "K1",
              "K2",
              "K3",
              "K4",
              "K5",
              "K6",
              "K7",
              "K8",
              "K9",
              "K10",
              "K11"
            ]
          },
          "limitation": ""
        },
        {
          "id": "complete-register",
          "type": "requirement_completeness",
          "text": [
            "J1",
            "J2",
            "J3",
            "J4",
            "J5",
            "J6",
            "J7",
            "J8",
            "J9",
            "J10",
            "J11"
          ],
          "passed": true,
          "evidence": {
            "expected": [
              "J1",
              "J2",
              "J3",
              "J4",
              "J5",
              "J6",
              "J7",
              "J8",
              "J9",
              "J10",
              "J11"
            ]
          },
          "limitation": ""
        }
      ],
      "humanReview": {
        "status": "pending",
        "reviewer": null,
        "reviewedAt": null,
        "checkpoints": [
          "Candidate truth and negation",
          "Requirement classification and completeness",
          "Role/competency duration and ownership",
          "Material source support and relevance",
          "Recommendation usefulness and safe practice",
          "Readability and package scope"
        ]
      },
      "automatedValidation": {
        "passed": true,
        "notAHumanApproval": true
      },
      "telemetry": {
        "durationMs": 5124,
        "calls": [
          {
            "stage": "recommendation_ranking",
            "model": "openai/gpt-5-mini",
            "requestStarted": "2026-10-29T11:51:03.392Z",
            "responseID": "gen_01M63QZMFVS83C1YN0SJHPX1EC",
            "inputTokens": 1740,
            "outputTokens": 244,
            "durationMs": 4528
          }
        ],
        "costUSD": null,
        "costNote": "Reconcile the captured generation ID with Gateway billing."
      }
    },
    "baseline": "Application Assessment and Improvement Plan\nTarget: ICON — CRA II and Senior CRA (JR159321)\nSources: ICON job posting (S1: https://careers.iconplc.com/job/cra-ii-and-senior-cra-in-regional-united-states-pra-jid-53448) and ICON Applicant AI Policy (S2: https://careers.iconplc.com/ai-usage-policy-for-job-applicants)\n\nExecutive summary (short)\nCandidate A meets several stated mandatory baseline requirements (BSc, ICH‑GCP training, >1 year independent monitoring experience) but lacks documented ownership of site qualification/initiation visits, close-out leadership, mentoring, trial leadership, measured performance metrics, travel/work‑authorization confirmation and any sponsor assignment or therapeutic‑area evidence. These gaps affect readiness for a Senior CRA title and influence ICON hiring decisions that request demonstrated independent visit ownership and ~60% travel availability (S1).\n\nThree critical findings (fact vs interpretation)\n1) Mandatory qualifications — fact: ICON requires a bachelor’s degree and “Minimum of 1 year of independent monitoring experience” and ICH‑GCP knowledge (S1). Interpretation: Candidate A’s 18 months as a CRO CRA satisfies the stated minimum on duration but scope matters — evidence shows only routine monitoring at six sites; qualification/initiations not independently performed.\n2) Visit ownership and trial scope — fact: ICON lists conducting site qualification, initiation, monitoring, and close‑out visits as responsibilities (S1). Interpretation: Candidate A documented routine monitoring and supported one close‑out but has no independent qualification/ initiation ownership; this reduces match for full CRA II/Senior expectations and senior readiness.\n3) ICON policy on authenticity — fact: ICON’s AI policy requires authentic, unmisrepresented application content and lists unacceptable AI uses (S2). Interpretation: Candidate must ensure any AI‑assisted résumé/content is truthful and personally edited before submission.\n\nHonest strengths (evidence-based)\n- Education: BSc Biology (C3) — meets ICON’s degree requirement (S1).\n- Monitoring experience: 18 months as CRO CRA performing independent routine monitoring at six US sites in two Phase III cardiometabolic trials (C4–C5) — meets the “minimum 1 year” requirement in duration (S1).\n- GCP: ICH‑GCP training listed (C9) — aligns with ICON required knowledge (S1).\n- Phase III exposure and CRO monitoring experience are relevant to ICON’s clinical monitoring responsibilities (S1).\n\nPrimary gaps (evidence-based)\n- No documented independent site qualification or initiation visits (C6) despite these being explicit responsibilities (S1).\n- Limited close‑out experience: “supported one close‑out” but not independent leadership (C6).\n- No evidence of trial ownership, escalating metrics, inspection outcomes, budget responsibility, mentoring, or reduction of overdue queries (C7–C8) — ICON may expect contribution and increasing responsibility for CRA II/Senior CRA roles (S1).\n- Travel availability and work authorization not supplied (C10) despite ~60% travel expectation (S1).\n- No sponsor/CRO scope confirmation or therapeutic area ownership (J14).\n\nEmployer‑specific implications\n- ICON explicitly expects independent conduct of qualification/initiation/close‑out visits (S1). Absence of independent qualification/initiation experience weakens candidacy for roles that expect end‑to‑end site management.\n- ICON’s ~60% travel requirement (S1) must be demonstrably feasible; omission may delay or block hiring.\n- ICON’s AI policy (S2) requires that application materials be authentic and personally verified; any AI assistance must be disclosed/edited to avoid disqualification.\n\nThree ranked practical next actions (highest impact first)\n1) Clarify and document visit ownership and travel/work status (Immediate — required):\n   - Update résumé and cover letter to state explicitly which visits were conducted independently vs supported (e.g., “independently performed routine monitoring visits at six U.S. sites; assisted CTM on one close‑out; no independent qualification/initiation performed”).\n   - Provide travel availability and current work authorization in the application.\n2) Demonstrate progression and judgment using concise, verifiable bullet achievements (2–7 days):\n   - Add specific, measurable outcomes from CRA role where true: e.g., query resolution volume, timeliness metrics, audit/inspection participation (if any), metrics escalated to CTM and consequences. Do not invent metrics—if none exist, state process involvement and escalation examples factually (C7).\n3) Seek quick, documented exposure to qualification/initiation and close‑out tasks (30–90 days) or secure a reference that confirms delegated responsibilities (medium term):\n   - Request CTM or manager reference statement that confirms independent monitoring tasks performed and any delegated qualification or initiation responsibilities you performed under supervision. If possible, obtain a short internal letter certifying independent monitoring scope and travel flexibility.\n\nApplication positioning (concise wording to use)\n- Position as “Early‑career CRO CRA with 18 months independent routine monitoring on Phase III cardiometabolic trials, BSc Biology, ICH‑GCP certified; experienced in site monitoring, data review and query management; seeking CRA II role at ICON with willingness for ~60% travel.” Be explicit about limits: “No independent initiation/qualification performed; supported one close‑out.”\n\nRésumé improvement priorities (ranked)\n1) Explicit visit ownership labels (Independent vs Assisted) for each listed visit — factual and critical for ICON (S1).\n2) Add travel and work‑authorization statements (citizenship/visa status, regional base, yes/no to ~60% travel).\n3) Short, verifiable accomplishment bullets (numbers only if accurate): e.g., “Monitored 6 sites across 2 Phase III trials; tracked and escalated recurring documentation issues to CTM” (C5–C7).\n4) Add GCP and relevant systems experience (EHR/EDC names) only if true.\n5) Prepare a single‑line note confirming compliance with ICON AI policy — e.g., “Application content is accurate and personally produced/edited in accordance with ICON AI Usage Policy” (S2).\n\nLimitations and required confirmations\n- Job paraphrase used here is the supplied ICON posting snapshot (S1); consult live posting for updates (J15).\n- Candidate A’s travel availability and work authorization are not provided (C10) — these must be confirmed by the candidate.\n- No sponsor, therapeutic area assignment, budget or mentoring evidence supplied (J14, C8) — implications for seniority are based on absence of evidence, not negative inference.\n\nNo guarantees are made. This plan assumes the supplied candidate facts are complete and true.",
    "stages": [
      {
        "stage": "recommendation_ranking",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T11:51:03.392Z",
        "responseID": "gen_01M63QZMFVS83C1YN0SJHPX1EC",
        "inputTokens": 1740,
        "outputTokens": 244,
        "durationMs": 4528,
        "status": "completed",
        "outputCharacters": 88,
        "sourceURLs": 0,
        "incompleteReason": null
      },
      {
        "stage": "baseline",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T11:51:07.925Z",
        "responseID": "gen_01M63QZRXQQ90FFCNYTCR1G2M4",
        "inputTokens": 3408,
        "outputTokens": 1498,
        "durationMs": 24620,
        "status": "completed",
        "outputCharacters": 6792,
        "sourceURLs": 0,
        "incompleteReason": null
      }
    ],
    "note": "Final bounded feasibility: actual one-attempt output, unedited. Automatic checks passed; human review pending. NO-GO for automated sale."
  },
  {
    "case": "CTM",
    "packageId": "interview",
    "draft": {
      "engineVersion": "0.4.0-evidence-first",
      "analysis": {
        "target": {
          "company": "ICON",
          "role": "Clinical Trial Manager II Biotech — United States, Remote"
        },
        "executive_verdict": {
          "recommendation": "Clarify eligibility first",
          "competitiveness": "Not scored as a hiring probability",
          "summary": "Clarify eligibility and evidence before relying on this assessment. The report separates supplied evidence from unverified scope, duration and employer acceptance.",
          "reasons_for": [],
          "reasons_against": []
        },
        "critical_findings": [
          {
            "heading": "Qualifying CTM tenure needs confirmation",
            "interpretation": "The intake lists 18 months in Associate CTM roles. An explicitly titled CTM duration is not supplied. Qualifying CTM tenure is unverified; title equivalence to the 24-month requirement needs employer confirmation.",
            "references": {
              "job_ids": [
                "J8"
              ],
              "candidate_ids": [
                "C4"
              ]
            }
          },
          {
            "heading": "Aggregate tenure is not qualifying ownership",
            "interpretation": "The listed clinical-role durations sum to 102 months (8.5 years), before checking overlaps and employer relevance. This sum does not establish qualifying CTM or independent monitoring tenure.",
            "references": {
              "job_ids": [
                "J10"
              ],
              "candidate_ids": [
                "C4"
              ]
            }
          },
          {
            "heading": "Budget support and accountability are different",
            "interpretation": "Budget-tracker support is documented; budget ownership and approval authority are not established. The JD’s oversight duty does not itself prove negotiation is mandatory.",
            "references": {
              "job_ids": [
                "J1"
              ],
              "candidate_ids": [
                "C7"
              ]
            }
          }
        ],
        "decision_drivers": [
          {
            "requirement": "The Level 2 profile requires at least two years in a CTM position at a CRO",
            "jd_evidence": "The Level 2 profile requires at least two years in a CTM position at a CRO",
            "classification": "mandatory"
          },
          {
            "requirement": "a relevant bachelor's degree",
            "jd_evidence": "a relevant bachelor's degree",
            "classification": "mandatory"
          },
          {
            "requirement": "at least eight years of relevant experience.",
            "jd_evidence": "at least eight years of relevant experience.",
            "classification": "mandatory"
          },
          {
            "requirement": "Responsibilities include clinical budget oversight",
            "jd_evidence": "Responsibilities include clinical budget oversight",
            "classification": "responsibility"
          },
          {
            "requirement": "and sponsor/vendor/cross-functional relationships.",
            "jd_evidence": "and sponsor/vendor/cross-functional relationships.",
            "classification": "responsibility"
          }
        ],
        "evidence_map": [
          {
            "id": "K8",
            "jobId": "J8",
            "driver": "The Level 2 profile requires at least two years in a CTM position at a CRO",
            "classification": "mandatory",
            "candidate_evidence": "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO.",
            "candidate_quotes": [
              "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO."
            ],
            "strength": "missing",
            "gap_type": "evidence_gap",
            "risk": "The intake lists 18 months in Associate CTM roles. An explicitly titled CTM duration is not supplied. Qualifying CTM tenure is unverified; title equivalence to the 24-month requirement needs employer confirmation.",
            "action": "Ask whether the exact title, dates and documented decision authority qualify; do not substitute aggregate clinical experience for CTM tenure."
          },
          {
            "id": "K9",
            "jobId": "J9",
            "driver": "a relevant bachelor's degree",
            "classification": "mandatory",
            "candidate_evidence": "BSc Nursing and MSc Clinical Research.",
            "candidate_quotes": [
              "BSc Nursing and MSc Clinical Research."
            ],
            "strength": "strong",
            "gap_type": "none",
            "risk": "A degree is reported in the intake. Credential equivalence and the employer’s acceptance remain unverified.",
            "action": "Check the stated degree requirement against the exact credential and any employer equivalence guidance."
          },
          {
            "id": "K10",
            "jobId": "J10",
            "driver": "at least eight years of relevant experience.",
            "classification": "mandatory",
            "candidate_evidence": "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO.",
            "candidate_quotes": [
              "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO."
            ],
            "strength": "missing",
            "gap_type": "evidence_gap",
            "risk": "The listed clinical-role durations sum to 102 months (8.5 years), before checking overlaps and employer relevance. This sum does not establish qualifying CTM or independent monitoring tenure.",
            "action": "Verify dates and which roles the employer counts toward the relevant-experience minimum."
          },
          {
            "id": "K1",
            "jobId": "J1",
            "driver": "Responsibilities include clinical budget oversight",
            "classification": "responsibility",
            "candidate_evidence": "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts.",
            "candidate_quotes": [
              "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts."
            ],
            "strength": "partial",
            "gap_type": "evidence_gap",
            "risk": "Budget-tracker support is documented; budget ownership and approval authority are not established. The JD’s oversight duty does not itself prove negotiation is mandatory.",
            "action": "Clarify who forecast, recommended, approved and signed off; describe only personal authority."
          },
          {
            "id": "K7",
            "jobId": "J7",
            "driver": "and sponsor/vendor/cross-functional relationships.",
            "classification": "responsibility",
            "candidate_evidence": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries.",
            "candidate_quotes": [
              "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries."
            ],
            "strength": "partial",
            "gap_type": "evidence_gap",
            "risk": "Follow-up and meeting summaries can show operational contribution; they do not establish sponsor negotiation or vendor authority.",
            "action": "Clarify which relationships and decisions were personally handled."
          }
        ],
        "company_intelligence": [
          {
            "factId": "E1",
            "finding": "The inspected applicant AI policy restricts misrepresentation of skills or experience.",
            "source_quote": "inaccurately portrays one's skills, experiences, or qualifications",
            "why_it_matters": "Use only supported responsibilities in preparation and read the full policy, including its conditions on generated application material and live assistance.",
            "provenance": "verified_public",
            "source_urls": [
              "https://careers.iconplc.com/ai-usage-policy-for-job-applicants"
            ],
            "source_id": "S3"
          }
        ],
        "positioning_strategy": {
          "headline": "Act on the evidence before expanding the claim.",
          "top_changes": [
            {
              "ruleId": "K8",
              "change": "Ask whether the exact title, dates and documented decision authority qualify; do not substitute aggregate clinical experience for CTM tenure.",
              "why": "Qualifying CTM tenure is separate from aggregate career duration.",
              "references": {
                "job_ids": [
                  "J8"
                ],
                "candidate_ids": [
                  "C4"
                ]
              }
            },
            {
              "ruleId": "K10",
              "change": "Verify dates and which roles the employer counts toward the relevant-experience minimum.",
              "why": "A duration sum does not establish employer-counted relevant experience.",
              "references": {
                "job_ids": [
                  "J10"
                ],
                "candidate_ids": [
                  "C4"
                ]
              }
            },
            {
              "ruleId": "K1",
              "change": "Clarify who forecast, recommended, approved and signed off; describe only personal authority.",
              "why": "Tracking a budget does not establish approval authority.",
              "references": {
                "job_ids": [
                  "J1"
                ],
                "candidate_ids": [
                  "C7"
                ]
              }
            },
            {
              "ruleId": "K7",
              "change": "Clarify which relationships and decisions were personally handled.",
              "why": "Resolve the specific competency using the cited evidence and its stated limits.",
              "references": {
                "job_ids": [
                  "J7"
                ],
                "candidate_ids": [
                  "C6"
                ]
              }
            }
          ],
          "resume_edits": []
        },
        "interview_map": [
          {
            "id": "P-ownership",
            "question": "Which decisions did you personally make, and which remained with the CTM or study lead?",
            "competency": "Accountability versus contribution",
            "best_candidate_evidence": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries.",
            "answer_strategy": "Use a real, deidentified trip-report or follow-up example if available. Separate your assessment, the accountable decision maker and the approval. Leave unsupplied results unknown.",
            "missing_info": "A concrete event, delegated authority and an honestly supported result.",
            "avoid": "Do not invent an outcome, responsibility or past event.",
            "provenance": "inference",
            "candidateIds": [
              "C6"
            ],
            "jobIds": [
              "J8"
            ]
          },
          {
            "id": "P-budget",
            "question": "How would you handle a budget variance when you do not have approval authority?",
            "competency": "Budget support and escalation",
            "best_candidate_evidence": "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts.",
            "answer_strategy": "Start with the reported budget-tracker support. Distinguish tracking, recommendation and approval; label any proposed ownership or escalation process hypothetical. Do not claim negotiation or sign-off authority.",
            "missing_info": "Personal authority and a real variance example, if any.",
            "avoid": "Do not invent an outcome, responsibility or past event.",
            "provenance": "inference",
            "candidateIds": [
              "C7"
            ],
            "jobIds": [
              "J1"
            ]
          },
          {
            "id": "P-startup",
            "question": "How would you plan start-up milestones for a study you had not previously led?",
            "competency": "Start-up planning",
            "best_candidate_evidence": "No past example is established; use a hypothetical approach.",
            "answer_strategy": "Start-up participation is not documented. State that first, then discuss a hypothetical milestone, dependency and escalation plan; do not describe a past start-up success.",
            "missing_info": "Any actual start-up role and its limits.",
            "avoid": "Do not invent an outcome, responsibility or past event.",
            "provenance": "inference",
            "candidateIds": [],
            "jobIds": [
              "J4"
            ]
          },
          {
            "id": "P-quality",
            "question": "How would you turn a trip-report issue into a tracked follow-up?",
            "competency": "Quality review and escalation",
            "best_candidate_evidence": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries.",
            "answer_strategy": "Use only an actual reported review/follow-up task. Identify who could decide and approve. Treat CAPA ownership as hypothetical unless separately evidenced, and do not invent a quantified result.",
            "missing_info": "A real example and evidence of any claimed outcome.",
            "avoid": "Do not invent an outcome, responsibility or past event.",
            "provenance": "inference",
            "candidateIds": [
              "C6"
            ],
            "jobIds": [
              "J5",
              "J6"
            ]
          }
        ],
        "clarification_questions": [
          {
            "question": "Ask whether the exact title, dates and documented decision authority qualify; do not substitute aggregate clinical experience for CTM tenure.",
            "why_needed": "This decision could change the application or preparation strategy.",
            "impact": "Confirm before making the associated claim."
          },
          {
            "question": "Verify dates and which roles the employer counts toward the relevant-experience minimum.",
            "why_needed": "This decision could change the application or preparation strategy.",
            "impact": "Confirm before making the associated claim."
          },
          {
            "question": "Clarify who forecast, recommended, approved and signed off; describe only personal authority.",
            "why_needed": "This decision could change the application or preparation strategy.",
            "impact": "Confirm before making the associated claim."
          }
        ],
        "source_index": [
          {
            "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
            "title": "ICON Plc: AI Usage Policy for Job Applicants",
            "type": "applicant_ai_policy",
            "date": "Access checked 2026-10-29T11:51:33.717Z; publication date not independently established"
          }
        ],
        "quality_notes": [
          "Candidate facts are self-reported intake evidence, not independent verification of employment.",
          "The supplied JD is preserved. Public posting status, credential acceptance and title equivalence are separate questions.",
          "Clinical interpretations and practice plans are rules-based suggestions requiring human clinical review."
        ]
      },
      "qualityFlags": [],
      "requiresFounderReview": true,
      "researchedAt": "2026-10-29T11:51:38.361Z",
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
            "text": "Responsibilities include clinical budget oversight",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships.",
            "competency": "budget_oversight",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J2",
            "text": "monitoring plans",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships.",
            "competency": "monitoring_plan",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J3",
            "text": "CRA training and mentoring",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships.",
            "competency": "cra_mentoring",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J4",
            "text": "study start-up and enrollment timelines",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships.",
            "competency": "startup",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J5",
            "text": "trip-report review",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships.",
            "competency": "trip_review",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J6",
            "text": "corrective and preventive actions",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships.",
            "competency": "capa",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J7",
            "text": "and sponsor/vendor/cross-functional relationships.",
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships.",
            "competency": "stakeholders",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "responsibility"
          },
          {
            "id": "J8",
            "text": "The Level 2 profile requires at least two years in a CTM position at a CRO",
            "classification": "mandatory",
            "sourceSentence": "The Level 2 profile requires at least two years in a CTM position at a CRO, a relevant bachelor's degree and at least eight years of relevant experience.",
            "competency": "ctm_tenure",
            "minimumMonths": 24,
            "provenance": "supplied_job_description",
            "kind": "mandatory"
          },
          {
            "id": "J9",
            "text": "a relevant bachelor's degree",
            "classification": "mandatory",
            "sourceSentence": "The Level 2 profile requires at least two years in a CTM position at a CRO, a relevant bachelor's degree and at least eight years of relevant experience.",
            "competency": "education",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "mandatory"
          },
          {
            "id": "J10",
            "text": "at least eight years of relevant experience.",
            "classification": "mandatory",
            "sourceSentence": "The Level 2 profile requires at least two years in a CTM position at a CRO, a relevant bachelor's degree and at least eight years of relevant experience.",
            "competency": "total_experience",
            "minimumMonths": 96,
            "provenance": "supplied_job_description",
            "kind": "mandatory"
          },
          {
            "id": "J11",
            "text": "Two years of monitoring is strongly preferred.",
            "classification": "preferred",
            "sourceSentence": "Two years of monitoring is strongly preferred.",
            "competency": "monitoring_tenure",
            "minimumMonths": 24,
            "provenance": "supplied_job_description",
            "kind": "preferred"
          },
          {
            "id": "J12",
            "text": "Complex or global trial management",
            "classification": "preferred",
            "sourceSentence": "Complex or global trial management, start-up through database-lock experience and mentoring other CTMs are preferred.",
            "competency": "global_trial",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "preferred"
          },
          {
            "id": "J13",
            "text": "start-up through database-lock experience",
            "classification": "preferred",
            "sourceSentence": "Complex or global trial management, start-up through database-lock experience and mentoring other CTMs are preferred.",
            "competency": "end_to_end",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "preferred"
          },
          {
            "id": "J14",
            "text": "mentoring other CTMs are preferred.",
            "classification": "preferred",
            "sourceSentence": "Complex or global trial management, start-up through database-lock experience and mentoring other CTMs are preferred.",
            "competency": "ctm_mentoring",
            "minimumMonths": null,
            "provenance": "supplied_job_description",
            "kind": "preferred"
          }
        ],
        "candidates": [
          {
            "id": "C1",
            "text": "FICTIONAL QA CANDIDATE — not a real person.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C2",
            "text": "Candidate B.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C3",
            "text": "BSc Nursing and MSc Clinical Research.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C4",
            "text": "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C5",
            "text": "Supported a Phase III U.S. cardiometabolic study across 24 sites.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C6",
            "text": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C7",
            "text": "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C8",
            "text": "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C9",
            "text": "Candidate reports U.S. work authorization.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C10",
            "text": "All metrics describe fictional scope, not performance improvements.",
            "provenance": "candidate_provided"
          },
          {
            "id": "C11",
            "text": "No claimed inspection or hiring outcomes.",
            "provenance": "candidate_provided"
          }
        ]
      },
      "fullRequirementRegister": [
        {
          "id": "K1",
          "jobId": "J1",
          "driver": "Responsibilities include clinical budget oversight",
          "classification": "responsibility",
          "candidate_evidence": "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts.",
          "candidate_quotes": [
            "Supported the clinical budget tracker but did not own the clinical budget, approve changes or negotiate contracts."
          ],
          "strength": "partial",
          "gap_type": "evidence_gap",
          "risk": "Budget-tracker support is documented; budget ownership and approval authority are not established. The JD’s oversight duty does not itself prove negotiation is mandatory.",
          "action": "Clarify who forecast, recommended, approved and signed off; describe only personal authority."
        },
        {
          "id": "K2",
          "jobId": "J2",
          "driver": "monitoring plans",
          "classification": "responsibility",
          "candidate_evidence": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries.",
          "candidate_quotes": [
            "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries."
          ],
          "strength": "partial",
          "gap_type": "evidence_gap",
          "risk": "Reviewing reports or trackers does not establish monitoring-plan authorship or accountability.",
          "action": "Separate executing a plan, suggesting changes and approving the monitoring strategy."
        },
        {
          "id": "K3",
          "jobId": "J3",
          "driver": "CRA training and mentoring",
          "classification": "responsibility",
          "candidate_evidence": "No supporting candidate excerpt is established.",
          "candidate_quotes": [],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "CRA follow-up, CRA training and mentoring other CTMs are different responsibilities; one does not establish the others.",
          "action": "Use an actual CRA coaching example only if one exists; otherwise prepare an explicitly hypothetical onboarding framework."
        },
        {
          "id": "K4",
          "jobId": "J4",
          "driver": "study start-up and enrollment timelines",
          "classification": "responsibility",
          "candidate_evidence": "No supporting candidate excerpt is established.",
          "candidate_quotes": [],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "Supporting a Phase III study or maintaining enrollment trackers does not establish start-up participation or end-to-end leadership.",
          "action": "If no start-up example is available, explain a clearly hypothetical milestone plan rather than claiming prior ownership."
        },
        {
          "id": "K5",
          "jobId": "J5",
          "driver": "trip-report review",
          "classification": "responsibility",
          "candidate_evidence": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries.",
          "candidate_quotes": [
            "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries."
          ],
          "strength": "strong",
          "gap_type": "none",
          "risk": "Trip-report review is a documented operational competency when explicitly stated; it does not establish overall trial accountability.",
          "action": "Prepare a deidentified review/follow-up example with an honest account of the decision maker and any unknown result."
        },
        {
          "id": "K6",
          "jobId": "J6",
          "driver": "corrective and preventive actions",
          "classification": "responsibility",
          "candidate_evidence": "No supporting candidate excerpt is established.",
          "candidate_quotes": [],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "Query escalation or trip-report review alone does not establish CAPA authorship or ownership.",
          "action": "Use a real CAPA example only if supported; otherwise label the escalation/CAPA approach hypothetical."
        },
        {
          "id": "K7",
          "jobId": "J7",
          "driver": "and sponsor/vendor/cross-functional relationships.",
          "classification": "responsibility",
          "candidate_evidence": "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries.",
          "candidate_quotes": [
            "Independently reviewed trip reports, maintained risk and enrollment trackers, coordinated CRA follow-up and prepared meeting summaries."
          ],
          "strength": "partial",
          "gap_type": "evidence_gap",
          "risk": "Follow-up and meeting summaries can show operational contribution; they do not establish sponsor negotiation or vendor authority.",
          "action": "Clarify which relationships and decisions were personally handled."
        },
        {
          "id": "K8",
          "jobId": "J8",
          "driver": "The Level 2 profile requires at least two years in a CTM position at a CRO",
          "classification": "mandatory",
          "candidate_evidence": "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO.",
          "candidate_quotes": [
            "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "The intake lists 18 months in Associate CTM roles. An explicitly titled CTM duration is not supplied. Qualifying CTM tenure is unverified; title equivalence to the 24-month requirement needs employer confirmation.",
          "action": "Ask whether the exact title, dates and documented decision authority qualify; do not substitute aggregate clinical experience for CTM tenure."
        },
        {
          "id": "K9",
          "jobId": "J9",
          "driver": "a relevant bachelor's degree",
          "classification": "mandatory",
          "candidate_evidence": "BSc Nursing and MSc Clinical Research.",
          "candidate_quotes": [
            "BSc Nursing and MSc Clinical Research."
          ],
          "strength": "strong",
          "gap_type": "none",
          "risk": "A degree is reported in the intake. Credential equivalence and the employer’s acceptance remain unverified.",
          "action": "Check the stated degree requirement against the exact credential and any employer equivalence guidance."
        },
        {
          "id": "K10",
          "jobId": "J10",
          "driver": "at least eight years of relevant experience.",
          "classification": "mandatory",
          "candidate_evidence": "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO.",
          "candidate_quotes": [
            "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "The listed clinical-role durations sum to 102 months (8.5 years), before checking overlaps and employer relevance. This sum does not establish qualifying CTM or independent monitoring tenure.",
          "action": "Verify dates and which roles the employer counts toward the relevant-experience minimum."
        },
        {
          "id": "K11",
          "jobId": "J11",
          "driver": "Two years of monitoring is strongly preferred.",
          "classification": "preferred",
          "candidate_evidence": "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO.",
          "candidate_quotes": [
            "Four years as a site CRC, three years as a CRO CRA and 18 months as an Associate CTM at a CRO."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "The intake lists 36 months in CRA roles. That does not establish 24 months actually spent monitoring; this is a preferred criterion.",
          "action": "Confirm actual monitoring dates and scope. Keep this preference separate from mandatory CTM eligibility."
        },
        {
          "id": "K12",
          "jobId": "J12",
          "driver": "Complex or global trial management",
          "classification": "preferred",
          "candidate_evidence": "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied.",
          "candidate_quotes": [
            "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "U.S. study participation does not establish global-trial leadership. Missing global scope is not proof of ineligibility for a preferred criterion.",
          "action": "Describe only documented geographic scope and ask how much this preference matters for the exact opportunity."
        },
        {
          "id": "K13",
          "jobId": "J13",
          "driver": "start-up through database-lock experience",
          "classification": "preferred",
          "candidate_evidence": "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied.",
          "candidate_quotes": [
            "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "Start-up participation and accountable delivery through database lock are distinct. End-to-end accountability is not established by a support title.",
          "action": "Keep this preferred experience separate from mandatory screening and clarify which milestones were personally owned."
        },
        {
          "id": "K14",
          "jobId": "J14",
          "driver": "mentoring other CTMs are preferred.",
          "classification": "preferred",
          "candidate_evidence": "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied.",
          "candidate_quotes": [
            "No independent end-to-end global trial leadership, database-lock ownership, CTM mentoring or management of CTMs supplied."
          ],
          "strength": "missing",
          "gap_type": "evidence_gap",
          "risk": "Mentoring CTMs is not established by coordinating CRA follow-up. Keep this preference distinct from mandatory experience.",
          "action": "State any actual mentoring scope precisely, or acknowledge the evidence gap."
        }
      ],
      "durationSummary": {
        "listedRoleMonths": 102,
        "listedRoleYears": 8.5,
        "independentMonitoringMonths": null,
        "qualifyingCtmMonths": null,
        "caveat": "The arithmetic sums stated role durations only. Overlaps, employer relevance, independent monitoring duration and qualifying CTM tenure require separate confirmation."
      },
      "sourceChecks": [
        {
          "url": "https://careers.iconplc.com/job/clinical-trial-manager-ii-biotech-united-states-remote-in-regional-united-states-pra-jid-36419",
          "finalURL": "https://careers.iconplc.com/job/clinical-trial-manager-ii-biotech-united-states-remote-in-regional-united-states-pra-jid-36419",
          "status": "inaccessible",
          "httpStatus": 404,
          "reason": "Source did not return HTTP 200.",
          "id": "S1",
          "checkedAt": "2026-10-29T11:51:32.901Z",
          "kind": "target_job",
          "employerDomainMatch": true
        },
        {
          "url": "https://careers.iconplc.com/",
          "finalURL": "https://careers.iconplc.com/",
          "status": "discovery_only",
          "title": "Clinical Research, Pharmaceutical, Medical Device Jobs | ICON Plc Careers",
          "contentSHA256": "f56506400e271fc9b4aad348b9437fd97ae5a0a35caeb08dec191e05f44c0de7",
          "id": "S2",
          "checkedAt": "2026-10-29T11:51:33.402Z",
          "kind": "policy_discovery",
          "employerDomainMatch": true,
          "reason": "Used only to look for an observed applicant AI policy link."
        },
        {
          "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
          "finalURL": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
          "status": "available",
          "title": "ICON Plc: AI Usage Policy for Job Applicants",
          "contentSHA256": "a596967ad5c06d780412f876f6e44b326a6a938a3dde1d1f95f87d18d0c8ee1c",
          "id": "S3",
          "checkedAt": "2026-10-29T11:51:33.717Z",
          "kind": "applicant_ai_policy",
          "employerDomainMatch": true
        }
      ],
      "researchGaps": [
        "https://careers.iconplc.com/job/clinical-trial-manager-ii-biotech-united-states-remote-in-regional-united-states-pra-jid-36419: inaccessible. Not used as verified employer evidence."
      ],
      "policy": {
        "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants"
      },
      "method": "Separate exact extraction, source inspection, versioned clinical rules, model ranking, deterministic compilation and independent claim checks. The model supplies IDs only, not factual prose.",
      "claimAudit": [
        {
          "id": "target",
          "type": "target",
          "text": {
            "company": "ICON",
            "role": "Clinical Trial Manager II Biotech — United States, Remote"
          },
          "passed": true,
          "evidence": {
            "company": "ICON",
            "role": "Clinical Trial Manager II Biotech — United States, Remote"
          },
          "limitation": ""
        },
        {
          "id": "jd-hash",
          "type": "input_integrity",
          "text": "91840b3eb25eef44aacc32e39da0ee02b4df8d07513412c7ab2cf80656f8ca4f",
          "passed": true,
          "evidence": {
            "original": "supplied JD"
          },
          "limitation": ""
        },
        {
          "id": "cv-hash",
          "type": "input_integrity",
          "text": "656fb2f0db876b71e0ff7399d142e0a97b0000a0f21cf2abcca459cf834ec0c7",
          "passed": true,
          "evidence": {
            "original": "supplied CV"
          },
          "limitation": ""
        },
        {
          "id": "decision-text",
          "type": "registered_recommendation",
          "text": {
            "recommendation": "Clarify eligibility first",
            "competitiveness": "Not scored as a hiring probability",
            "summary": "Clarify eligibility and evidence before relying on this assessment. The report separates supplied evidence from unverified scope, duration and employer acceptance.",
            "reasons_for": [],
            "reasons_against": []
          },
          "passed": true,
          "evidence": {
            "registry": "CAREER_DECISION"
          },
          "limitation": ""
        },
        {
          "id": "J1",
          "type": "job_requirement",
          "text": "Responsibilities include clinical budget oversight",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J2",
          "type": "job_requirement",
          "text": "monitoring plans",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J3",
          "type": "job_requirement",
          "text": "CRA training and mentoring",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J4",
          "type": "job_requirement",
          "text": "study start-up and enrollment timelines",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J5",
          "type": "job_requirement",
          "text": "trip-report review",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J6",
          "type": "job_requirement",
          "text": "corrective and preventive actions",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J7",
          "type": "job_requirement",
          "text": "and sponsor/vendor/cross-functional relationships.",
          "passed": true,
          "evidence": {
            "classification": "responsibility",
            "sourceSentence": "Responsibilities include clinical budget oversight, monitoring plans, CRA training and mentoring, study start-up and enrollment timelines, trip-report review, corrective and preventive actions, and sponsor/vendor/cross-functional relationships."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J8",
          "type": "job_requirement",
          "text": "The Level 2 profile requires at least two years in a CTM position at a CRO",
          "passed": true,
          "evidence": {
            "classification": "mandatory",
            "sourceSentence": "The Level 2 profile requires at least two years in a CTM position at a CRO, a relevant bachelor's degree and at least eight years of relevant experience."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J9",
          "type": "job_requirement",
          "text": "a relevant bachelor's degree",
          "passed": true,
          "evidence": {
            "classification": "mandatory",
            "sourceSentence": "The Level 2 profile requires at least two years in a CTM position at a CRO, a relevant bachelor's degree and at least eight years of relevant experience."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J10",
          "type": "job_requirement",
          "text": "at least eight years of relevant experience.",
          "passed": true,
          "evidence": {
            "classification": "mandatory",
            "sourceSentence": "The Level 2 profile requires at least two years in a CTM position at a CRO, a relevant bachelor's degree and at least eight years of relevant experience."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J11",
          "type": "job_requirement",
          "text": "Two years of monitoring is strongly preferred.",
          "passed": true,
          "evidence": {
            "classification": "preferred",
            "sourceSentence": "Two years of monitoring is strongly preferred."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J12",
          "type": "job_requirement",
          "text": "Complex or global trial management",
          "passed": true,
          "evidence": {
            "classification": "preferred",
            "sourceSentence": "Complex or global trial management, start-up through database-lock experience and mentoring other CTMs are preferred."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J13",
          "type": "job_requirement",
          "text": "start-up through database-lock experience",
          "passed": true,
          "evidence": {
            "classification": "preferred",
            "sourceSentence": "Complex or global trial management, start-up through database-lock experience and mentoring other CTMs are preferred."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "J14",
          "type": "job_requirement",
          "text": "mentoring other CTMs are preferred.",
          "passed": true,
          "evidence": {
            "classification": "preferred",
            "sourceSentence": "Complex or global trial management, start-up through database-lock experience and mentoring other CTMs are preferred."
          },
          "limitation": "This is the supplied JD, not a claim the public vacancy is open."
        },
        {
          "id": "T1",
          "type": "reported_role_duration",
          "text": "Four years as a site CRC",
          "passed": true,
          "evidence": {
            "value": 4,
            "unit": "years",
            "months": 48,
            "family": "crc"
          },
          "limitation": "Job-title tenure is not independent-monitoring or qualifying CTM tenure."
        },
        {
          "id": "T2",
          "type": "reported_role_duration",
          "text": "three years as a CRO CRA",
          "passed": true,
          "evidence": {
            "value": 3,
            "unit": "years",
            "months": 36,
            "family": "cra"
          },
          "limitation": "Job-title tenure is not independent-monitoring or qualifying CTM tenure."
        },
        {
          "id": "T3",
          "type": "reported_role_duration",
          "text": "18 months as an Associate CTM at a CRO.",
          "passed": true,
          "evidence": {
            "value": 18,
            "unit": "months",
            "months": 18,
            "family": "associate_ctm"
          },
          "limitation": "Job-title tenure is not independent-monitoring or qualifying CTM tenure."
        },
        {
          "id": "sum",
          "type": "derived_arithmetic",
          "text": "102 stated months / 12 = 8.5 years",
          "passed": true,
          "evidence": {
            "operands": [
              "T1",
              "T2",
              "T3"
            ]
          },
          "limitation": "Overlaps and employer relevance are unverified."
        },
        {
          "id": "displayed-duration-summary",
          "type": "derived_arithmetic",
          "text": {
            "listedRoleMonths": 102,
            "listedRoleYears": 8.5,
            "independentMonitoringMonths": null,
            "qualifyingCtmMonths": null,
            "caveat": "The arithmetic sums stated role durations only. Overlaps, employer relevance, independent monitoring duration and qualifying CTM tenure require separate confirmation."
          },
          "passed": true,
          "evidence": {
            "source": "validated role-duration operands"
          },
          "limitation": ""
        },
        {
          "id": "independent-duration",
          "type": "unknown",
          "text": null,
          "passed": true,
          "evidence": {
            "reason": "No explicitly quantified independent monitoring period."
          },
          "limitation": ""
        },
        {
          "id": "qualifying-ctm-duration",
          "type": "unknown",
          "text": null,
          "passed": true,
          "evidence": {
            "reason": "No employer-confirmed qualifying CTM tenure is supplied."
          },
          "limitation": ""
        },
        {
          "id": "K1",
          "type": "clinical_interpretation",
          "text": "Budget-tracker support is documented; budget ownership and approval authority are not established. The JD’s oversight duty does not itself prove negotiation is mandatory.",
          "passed": true,
          "evidence": {
            "jobId": "J1",
            "classification": "responsibility",
            "candidateIds": [
              "C7"
            ],
            "rule": "budget_oversight"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K2",
          "type": "clinical_interpretation",
          "text": "Reviewing reports or trackers does not establish monitoring-plan authorship or accountability.",
          "passed": true,
          "evidence": {
            "jobId": "J2",
            "classification": "responsibility",
            "candidateIds": [
              "C6"
            ],
            "rule": "monitoring_plan"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K3",
          "type": "clinical_interpretation",
          "text": "CRA follow-up, CRA training and mentoring other CTMs are different responsibilities; one does not establish the others.",
          "passed": true,
          "evidence": {
            "jobId": "J3",
            "classification": "responsibility",
            "candidateIds": [],
            "rule": "cra_mentoring"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K4",
          "type": "clinical_interpretation",
          "text": "Supporting a Phase III study or maintaining enrollment trackers does not establish start-up participation or end-to-end leadership.",
          "passed": true,
          "evidence": {
            "jobId": "J4",
            "classification": "responsibility",
            "candidateIds": [],
            "rule": "startup"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K5",
          "type": "clinical_interpretation",
          "text": "Trip-report review is a documented operational competency when explicitly stated; it does not establish overall trial accountability.",
          "passed": true,
          "evidence": {
            "jobId": "J5",
            "classification": "responsibility",
            "candidateIds": [
              "C6"
            ],
            "rule": "trip_review"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K6",
          "type": "clinical_interpretation",
          "text": "Query escalation or trip-report review alone does not establish CAPA authorship or ownership.",
          "passed": true,
          "evidence": {
            "jobId": "J6",
            "classification": "responsibility",
            "candidateIds": [],
            "rule": "capa"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K7",
          "type": "clinical_interpretation",
          "text": "Follow-up and meeting summaries can show operational contribution; they do not establish sponsor negotiation or vendor authority.",
          "passed": true,
          "evidence": {
            "jobId": "J7",
            "classification": "responsibility",
            "candidateIds": [
              "C6"
            ],
            "rule": "stakeholders"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K8",
          "type": "clinical_interpretation",
          "text": "The intake lists 18 months in Associate CTM roles. An explicitly titled CTM duration is not supplied. Qualifying CTM tenure is unverified; title equivalence to the 24-month requirement needs employer confirmation.",
          "passed": true,
          "evidence": {
            "jobId": "J8",
            "classification": "mandatory",
            "candidateIds": [
              "C4"
            ],
            "rule": "ctm_tenure"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K9",
          "type": "clinical_interpretation",
          "text": "A degree is reported in the intake. Credential equivalence and the employer’s acceptance remain unverified.",
          "passed": true,
          "evidence": {
            "jobId": "J9",
            "classification": "mandatory",
            "candidateIds": [
              "C3"
            ],
            "rule": "education"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K10",
          "type": "clinical_interpretation",
          "text": "The listed clinical-role durations sum to 102 months (8.5 years), before checking overlaps and employer relevance. This sum does not establish qualifying CTM or independent monitoring tenure.",
          "passed": true,
          "evidence": {
            "jobId": "J10",
            "classification": "mandatory",
            "candidateIds": [
              "C4"
            ],
            "rule": "total_experience"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K11",
          "type": "clinical_interpretation",
          "text": "The intake lists 36 months in CRA roles. That does not establish 24 months actually spent monitoring; this is a preferred criterion.",
          "passed": true,
          "evidence": {
            "jobId": "J11",
            "classification": "preferred",
            "candidateIds": [
              "C4"
            ],
            "rule": "monitoring_tenure"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K12",
          "type": "clinical_interpretation",
          "text": "U.S. study participation does not establish global-trial leadership. Missing global scope is not proof of ineligibility for a preferred criterion.",
          "passed": true,
          "evidence": {
            "jobId": "J12",
            "classification": "preferred",
            "candidateIds": [
              "C8"
            ],
            "rule": "global_trial"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K13",
          "type": "clinical_interpretation",
          "text": "Start-up participation and accountable delivery through database lock are distinct. End-to-end accountability is not established by a support title.",
          "passed": true,
          "evidence": {
            "jobId": "J13",
            "classification": "preferred",
            "candidateIds": [
              "C8"
            ],
            "rule": "end_to_end"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "K14",
          "type": "clinical_interpretation",
          "text": "Mentoring CTMs is not established by coordinating CRA follow-up. Keep this preference distinct from mandatory experience.",
          "passed": true,
          "evidence": {
            "jobId": "J14",
            "classification": "preferred",
            "candidateIds": [
              "C8"
            ],
            "rule": "ctm_mentoring"
          },
          "limitation": "Rule-based interpretation requires independent human clinical review."
        },
        {
          "id": "E1",
          "type": "employer_fact",
          "text": "The inspected applicant AI policy restricts misrepresentation of skills or experience.",
          "passed": true,
          "evidence": {
            "sourceId": "S3",
            "url": "https://careers.iconplc.com/ai-usage-policy-for-job-applicants",
            "contentSHA256": "a596967ad5c06d780412f876f6e44b326a6a938a3dde1d1f95f87d18d0c8ee1c",
            "quote": "inaccurately portrays one's skills, experiences, or qualifications",
            "checkedAt": "2026-10-29T11:51:33.717Z"
          },
          "limitation": "An excerpt supports its limited claim, not private hiring practices."
        },
        {
          "id": "displayed-employer-1",
          "type": "compiled_employer_claim",
          "text": "The inspected applicant AI policy restricts misrepresentation of skills or experience.",
          "passed": true,
          "evidence": {
            "factId": "E1"
          },
          "limitation": ""
        },
        {
          "id": "finding-1",
          "type": "compiled_interpretation",
          "text": "The intake lists 18 months in Associate CTM roles. An explicitly titled CTM duration is not supplied. Qualifying CTM tenure is unverified; title equivalence to the 24-month requirement needs employer confirmation.",
          "passed": true,
          "evidence": {
            "ruleId": "K8"
          },
          "limitation": ""
        },
        {
          "id": "finding-2",
          "type": "compiled_interpretation",
          "text": "The listed clinical-role durations sum to 102 months (8.5 years), before checking overlaps and employer relevance. This sum does not establish qualifying CTM or independent monitoring tenure.",
          "passed": true,
          "evidence": {
            "ruleId": "K10"
          },
          "limitation": ""
        },
        {
          "id": "finding-3",
          "type": "compiled_interpretation",
          "text": "Budget-tracker support is documented; budget ownership and approval authority are not established. The JD’s oversight duty does not itself prove negotiation is mandatory.",
          "passed": true,
          "evidence": {
            "ruleId": "K1"
          },
          "limitation": ""
        },
        {
          "id": "display-K8",
          "type": "displayed_evidence",
          "text": "The Level 2 profile requires at least two years in a CTM position at a CRO",
          "passed": true,
          "evidence": {
            "jobId": "J8",
            "candidateIds": [
              "C4"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K9",
          "type": "displayed_evidence",
          "text": "a relevant bachelor's degree",
          "passed": true,
          "evidence": {
            "jobId": "J9",
            "candidateIds": [
              "C3"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K10",
          "type": "displayed_evidence",
          "text": "at least eight years of relevant experience.",
          "passed": true,
          "evidence": {
            "jobId": "J10",
            "candidateIds": [
              "C4"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K1",
          "type": "displayed_evidence",
          "text": "Responsibilities include clinical budget oversight",
          "passed": true,
          "evidence": {
            "jobId": "J1",
            "candidateIds": [
              "C7"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K7",
          "type": "displayed_evidence",
          "text": "and sponsor/vendor/cross-functional relationships.",
          "passed": true,
          "evidence": {
            "jobId": "J7",
            "candidateIds": [
              "C6"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K1",
          "type": "displayed_evidence",
          "text": "Responsibilities include clinical budget oversight",
          "passed": true,
          "evidence": {
            "jobId": "J1",
            "candidateIds": [
              "C7"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K2",
          "type": "displayed_evidence",
          "text": "monitoring plans",
          "passed": true,
          "evidence": {
            "jobId": "J2",
            "candidateIds": [
              "C6"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K3",
          "type": "displayed_evidence",
          "text": "CRA training and mentoring",
          "passed": true,
          "evidence": {
            "jobId": "J3",
            "candidateIds": []
          },
          "limitation": ""
        },
        {
          "id": "display-K4",
          "type": "displayed_evidence",
          "text": "study start-up and enrollment timelines",
          "passed": true,
          "evidence": {
            "jobId": "J4",
            "candidateIds": []
          },
          "limitation": ""
        },
        {
          "id": "display-K5",
          "type": "displayed_evidence",
          "text": "trip-report review",
          "passed": true,
          "evidence": {
            "jobId": "J5",
            "candidateIds": [
              "C6"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K6",
          "type": "displayed_evidence",
          "text": "corrective and preventive actions",
          "passed": true,
          "evidence": {
            "jobId": "J6",
            "candidateIds": []
          },
          "limitation": ""
        },
        {
          "id": "display-K7",
          "type": "displayed_evidence",
          "text": "and sponsor/vendor/cross-functional relationships.",
          "passed": true,
          "evidence": {
            "jobId": "J7",
            "candidateIds": [
              "C6"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K8",
          "type": "displayed_evidence",
          "text": "The Level 2 profile requires at least two years in a CTM position at a CRO",
          "passed": true,
          "evidence": {
            "jobId": "J8",
            "candidateIds": [
              "C4"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K9",
          "type": "displayed_evidence",
          "text": "a relevant bachelor's degree",
          "passed": true,
          "evidence": {
            "jobId": "J9",
            "candidateIds": [
              "C3"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K10",
          "type": "displayed_evidence",
          "text": "at least eight years of relevant experience.",
          "passed": true,
          "evidence": {
            "jobId": "J10",
            "candidateIds": [
              "C4"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K11",
          "type": "displayed_evidence",
          "text": "Two years of monitoring is strongly preferred.",
          "passed": true,
          "evidence": {
            "jobId": "J11",
            "candidateIds": [
              "C4"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K12",
          "type": "displayed_evidence",
          "text": "Complex or global trial management",
          "passed": true,
          "evidence": {
            "jobId": "J12",
            "candidateIds": [
              "C8"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K13",
          "type": "displayed_evidence",
          "text": "start-up through database-lock experience",
          "passed": true,
          "evidence": {
            "jobId": "J13",
            "candidateIds": [
              "C8"
            ]
          },
          "limitation": ""
        },
        {
          "id": "display-K14",
          "type": "displayed_evidence",
          "text": "mentoring other CTMs are preferred.",
          "passed": true,
          "evidence": {
            "jobId": "J14",
            "candidateIds": [
              "C8"
            ]
          },
          "limitation": ""
        },
        {
          "id": "action-1",
          "type": "registered_action",
          "text": "Ask whether the exact title, dates and documented decision authority qualify; do not substitute aggregate clinical experience for CTM tenure.",
          "passed": true,
          "evidence": {
            "ruleId": "K8"
          },
          "limitation": ""
        },
        {
          "id": "action-2",
          "type": "registered_action",
          "text": "Verify dates and which roles the employer counts toward the relevant-experience minimum.",
          "passed": true,
          "evidence": {
            "ruleId": "K10"
          },
          "limitation": ""
        },
        {
          "id": "action-3",
          "type": "registered_action",
          "text": "Clarify who forecast, recommended, approved and signed off; describe only personal authority.",
          "passed": true,
          "evidence": {
            "ruleId": "K1"
          },
          "limitation": ""
        },
        {
          "id": "action-4",
          "type": "registered_action",
          "text": "Clarify which relationships and decisions were personally handled.",
          "passed": true,
          "evidence": {
            "ruleId": "K7"
          },
          "limitation": ""
        },
        {
          "id": "selection",
          "type": "recommendation_selection",
          "text": {
            "priority_ids": [
              "K8",
              "K10",
              "K1"
            ],
            "action_ids": [
              "K8",
              "K10",
              "K1",
              "K7"
            ],
            "practice_ids": [
              "P-ownership",
              "P-budget",
              "P-startup",
              "P-quality"
            ]
          },
          "passed": true,
          "evidence": {
            "allowedCardIds": [
              "K1",
              "K2",
              "K3",
              "K4",
              "K5",
              "K6",
              "K7",
              "K8",
              "K9",
              "K10",
              "K11",
              "K12",
              "K13",
              "K14"
            ]
          },
          "limitation": ""
        },
        {
          "id": "complete-register",
          "type": "requirement_completeness",
          "text": [
            "J1",
            "J2",
            "J3",
            "J4",
            "J5",
            "J6",
            "J7",
            "J8",
            "J9",
            "J10",
            "J11",
            "J12",
            "J13",
            "J14"
          ],
          "passed": true,
          "evidence": {
            "expected": [
              "J1",
              "J2",
              "J3",
              "J4",
              "J5",
              "J6",
              "J7",
              "J8",
              "J9",
              "J10",
              "J11",
              "J12",
              "J13",
              "J14"
            ]
          },
          "limitation": ""
        },
        {
          "id": "P-ownership",
          "type": "inferred_practice",
          "text": "Which decisions did you personally make, and which remained with the CTM or study lead?",
          "passed": true,
          "evidence": {
            "candidateIds": [
              "C6"
            ],
            "jobIds": [
              "J8"
            ]
          },
          "limitation": "Practice theme only; no employer question or past candidate event is asserted."
        },
        {
          "id": "P-budget",
          "type": "inferred_practice",
          "text": "How would you handle a budget variance when you do not have approval authority?",
          "passed": true,
          "evidence": {
            "candidateIds": [
              "C7"
            ],
            "jobIds": [
              "J1"
            ]
          },
          "limitation": "Practice theme only; no employer question or past candidate event is asserted."
        },
        {
          "id": "P-startup",
          "type": "inferred_practice",
          "text": "How would you plan start-up milestones for a study you had not previously led?",
          "passed": true,
          "evidence": {
            "candidateIds": [],
            "jobIds": [
              "J4"
            ]
          },
          "limitation": "Practice theme only; no employer question or past candidate event is asserted."
        },
        {
          "id": "P-quality",
          "type": "inferred_practice",
          "text": "How would you turn a trip-report issue into a tracked follow-up?",
          "passed": true,
          "evidence": {
            "candidateIds": [
              "C6"
            ],
            "jobIds": [
              "J5",
              "J6"
            ]
          },
          "limitation": "Practice theme only; no employer question or past candidate event is asserted."
        }
      ],
      "humanReview": {
        "status": "pending",
        "reviewer": null,
        "reviewedAt": null,
        "checkpoints": [
          "Candidate truth and negation",
          "Requirement classification and completeness",
          "Role/competency duration and ownership",
          "Material source support and relevance",
          "Recommendation usefulness and safe practice",
          "Readability and package scope"
        ]
      },
      "automatedValidation": {
        "passed": true,
        "notAHumanApproval": true
      },
      "telemetry": {
        "durationMs": 5816,
        "calls": [
          {
            "stage": "recommendation_ranking",
            "model": "openai/gpt-5-mini",
            "requestStarted": "2026-10-29T11:51:33.719Z",
            "responseID": "gen_01M63R0J3BHP237ANZEGHR8S3G",
            "inputTokens": 2416,
            "outputTokens": 491,
            "durationMs": 4641
          }
        ],
        "costUSD": null,
        "costNote": "Reconcile the captured generation ID with Gateway billing."
      }
    },
    "baseline": "ICON — Clinical Trial Manager II, Biotech — United States, Remote\nBriefing for Candidate B (fictional)\n\nSources inspected\n- Job posting JR121420 paraphrase supplied (in packet). Exact online posting URL checked but returned no HTTP 200; vacancy content in packet is the authoritative job summary for this briefing (source checked: S1 inaccessible). Limitations: I could not retrieve the live posting to confirm up-to-date wording or vacancy status.\n- ICON applicant AI policy (available): https://careers.iconplc.com/ai-usage-policy-for-job-applicants (S3). I used this when advising on AI use and authenticity.\n\nFact summary (separate from interpretation)\n- Mandatory employer requirements (per supplied job evidence): \n  - At least two years in a CTM position at a CRO (J10).\n  - A relevant bachelor’s degree and at least eight years of relevant experience (J11).\n- Preferred employer qualifications/experience:\n  - Two years of monitoring is strongly preferred (J12).\n  - Complex or global trial management preferred (J13).\n  - Start-up through database-lock experience and mentoring other CTMs preferred (J14).\n- Key responsibilities highlighted: clinical budget oversight, monitoring plans, CRA training/mentoring, study start-up and enrollment timelines, trip-report review, CAPAs, sponsor/vendor/cross-functional relationships (J3–J9).\n- Candidate B facts from your packet:\n  - BSc Nursing and MSc Clinical Research (C3).\n  - Work history: 4 yrs site CRC, 3 yrs CRO CRA, 18 months Associate CTM (C4); total stated months = 102 (packet calculation) but qualifying CTM ownership requires verification (C11, J16).\n  - Supported a Phase III U.S. cardiometabolic study across 24 sites; trip reports, risk/enrollment trackers, CRA follow-up, meeting summaries (C5–C6).\n  - Supported but did not own clinical budget; no contract negotiation or budget-approval authority (C7).\n  - No independent end-to-end global trial leadership, database-lock ownership, or CTM mentoring (C8).\n  - U.S. work authorization declared (C9).\n\nThree critical findings (concise)\n1. Eligibility risk: The role mandates ≥2 years as a CTM at a CRO; Candidate B has 18 months as an Associate CTM — may not meet the strict “at least two years in a CTM position” requirement unless ICON interprets Associate CTM duties as qualifying (J10, J16; C4).\n2. Experience gaps for preferred items: Candidate lacks independent end-to-end global trial leadership, database-lock ownership, and CTM mentoring—items explicitly preferred (J13–J14; C8).\n3. Strong partial alignment on responsibilities: Candidate has direct experience with monitoring-related tasks (trip-report review, trackers, CRA coordination) and therapeutic area Phase III U.S. study support, which map well to monitoring and start-up/enrollment responsibilities (J4, J6, J7; C5–C6).\n\nHonest strengths and gaps (employer-specific)\n- Strengths:\n  - Relevant degrees (BSc Nursing + MSc Clinical Research) satisfy the bachelor’s degree mandatory requirement (J11; C3).\n  - Direct CRA experience (3 yrs) and site CRC background provide practical monitoring/site relations skills; Phase III U.S. trial exposure across 24 sites is directly relevant to ICON biotech CTM responsibilities (J4–J6; C4–C6).\n  - Familiarity with trip reports, trackers and CRA follow-up demonstrates hands-on operational skills required by the role (J7; C6).\n- Gaps:\n  - CTM tenure: 18 months Associate CTM vs required ≥2 years as CTM at a CRO (J10; C4).\n  - No ownership of clinical budgets or contract negotiation—role lists clinical budget oversight as a responsibility (J3; C7).\n  - No end-to-end trial ownership, database-lock experience, or CTM mentoring—preferred but likely influential in selection (J13–J14; C8).\n\nEmployer-specific implications\n- Icon may screen out candidates without the explicit two-year CTM CRO tenure. If Associate CTM is considered non-equivalent (J16), Candidate B risks not satisfying the mandatory time-in-role.\n- Preferred items (global trials, database-lock, mentoring) will disadvantage the candidate against applicants who demonstrate these competencies and leadership.\n- Candidate’s concrete CRO CRA experience and Phase III site coverage can be emphasized to frame rapid readiness for CTM II responsibilities, but must be backed by specific examples and measurable ownership during interviews.\n\nRanked practical next actions (high-impact, short list)\n1. Verify/clarify title equivalence: Obtain from ICON recruiter or posting owner whether Associate CTM counts toward the “two years CTM at a CRO” requirement (J16). This is binary eligibility — do this first.\n2. Prepare targeted evidence of CTM ownership tasks during the 18-month period (trip reports reviewed, trackers maintained, decisions made)—document specific examples, decision points, and outcomes to argue substantive CTM experience despite title (C6).\n3. Build concise scenarios showing budget-related involvement: detail any forecasting, variance reporting, or vendor cost interactions you did to bridge the budget experience gap (C7).\n4. Prepare rapid-study-ownership narratives and learning plan: draft a 90-day plan describing how you would assume database-lock and mentoring responsibilities if hired — shows readiness for preferred expectations (J13–J14).\n\nPractice (3–4 personalized interview questions with conditional answer frameworks and evidence gaps)\n1. Practice Q: “Describe a time you managed monitoring activities across multiple sites to keep enrollment on track.” \n   - Framework: Situation (Phase III cardiometabolic, 24 sites) → Actions (risk/enrollment tracker updates, CRA follow-up cadence, escalation) → Result (enrollment trend, mitigations). \n   - Evidence gap to fill: specific metric(s) you influenced (e.g., % enrollment target vs actual) and an example of a corrective action you initiated (C5–C6).\n\n2. Practice Q: “Explain your experience with clinical budgeting and how you’d oversee a study budget.”\n   - Framework: Describe scope of supporting tasks you performed → name tools/processes used → propose how you would escalate/approve changes and work with Finance/Vendors. \n   - Evidence gap: no ownership/approval instances—prepare a transferable example where your input materially affected cost or resource allocation (C7).\n\n3. Practice Q: “Tell us about mentoring or coaching CRAs/CTMs and a time you resolved a performance or quality issue.”\n   - Framework: Context (staff skill gap) → Coaching steps (training, monitoring plan changes, feedback) → Outcome and follow-up. \n   - Evidence gap: Candidate has not mentored CTMs—prepare examples of informal training/coaching you performed for CRAs or site staff (C6, C4).\n\nApplicant AI policy note\n- ICON’s AI policy allows AI for interview preparation and editing but prohibits misrepresentation and unedited AI content (S3). Ensure all submitted materials and interview statements reflect your authentic experience and that you disclose AI assistance only where required.\n\nLimitations and no-guarantee\n- I relied on the supplied paraphrase; the live posting (S1) was inaccessible. Confirm current vacancy text/eligibility with ICON. No hiring guarantees offered.",
    "stages": [
      {
        "stage": "recommendation_ranking",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T11:51:33.719Z",
        "responseID": "gen_01M63R0J3BHP237ANZEGHR8S3G",
        "inputTokens": 2416,
        "outputTokens": 491,
        "durationMs": 4641,
        "status": "completed",
        "outputCharacters": 136,
        "sourceURLs": 0,
        "incompleteReason": null
      },
      {
        "stage": "baseline",
        "model": "openai/gpt-5-mini",
        "requestStarted": "2026-10-29T11:51:38.363Z",
        "responseID": "gen_01M63R0PMEAT1M5XYJM70M8Q5G",
        "inputTokens": 1948,
        "outputTokens": 1647,
        "durationMs": 12059,
        "status": "completed",
        "outputCharacters": 7150,
        "sourceURLs": 0,
        "incompleteReason": null
      }
    ],
    "note": "Final bounded feasibility: actual one-attempt output, unedited. Automatic checks passed; human review pending. NO-GO for automated sale."
  }
];
