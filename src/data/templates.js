export const regions = [
  { id: 'hq', name: 'Global HQ', countries: ['Canada'] },
  { id: 'africa', name: 'Africa Regional Office', countries: ['Ethiopia', 'Kenya', 'Nigeria', 'Senegal', 'Tanzania'] },
  { id: 'asia', name: 'Asia Regional Office', countries: ['Bangladesh', 'India', 'Indonesia', 'Pakistan', 'Philippines'] }
];

export const contractTerms = ['Fixed Term', 'Open Ended'];
export const workSchedules = ['Full-Time', 'Part-Time'];
export const categories = ['Standard', 'Consultancy', 'Field Staff Direct Hire', 'Expat'];

export const initialTemplates = [
  {
    id: 'standard-ft-fixed',
    name: 'Standard Offer (Fixed Term)',
    region: 'africa',
    country: 'Kenya',
    term: 'Fixed Term',
    schedule: 'Full-Time',
    category: 'Standard',
    description: 'A formal offer letter for full-time fixed-term roles in Kenya.',
    content: `[Date]

[Candidate Name]
[Candidate Address]

Subject: Offer of Employment - [Job Title] (Fixed Term)

Dear [Candidate Name],

On behalf of Nutrition International, I am pleased to offer you a Fixed Term position as [Job Title] based in our [Country] office. 

Your employment will be subject to the following terms:

Position: [Job Title]
Start Date: [Start Date]
End Date: [End Date]
Term: Fixed Term ([Duration Months] months)
Reports To: [Manager Name]
Base Salary: [Currency] [Salary Amount] per [Pay Frequency]

Benefits:
As a full-time employee, you will be eligible for our standard benefits package as per local labor laws.

Sincerely,

[Signatory Name]
[Signatory Title]`,
    fields: [
      { id: 'date', label: 'Date', type: 'date', defaultValue: new Date().toLocaleDateString() },
      { id: 'candidateName', label: 'Candidate Name', type: 'text' },
      { id: 'candidateAddress', label: 'Candidate Address', type: 'textarea' },
      { id: 'jobTitle', label: 'Job Title', type: 'text' },
      { id: 'country', label: 'Country', type: 'text', defaultValue: 'Kenya' },
      { id: 'startDate', label: 'Start Date', type: 'date' },
      { id: 'endDate', label: 'End Date', type: 'date' },
      { id: 'durationMonths', label: 'Duration Months', type: 'number', defaultValue: '12' },
      { id: 'managerName', label: 'Manager Name', type: 'text' },
      { id: 'currency', label: 'Currency', type: 'text', defaultValue: 'KES' },
      { id: 'salaryAmount', label: 'Salary Amount', type: 'number' },
      { id: 'payFrequency', label: 'Pay Frequency', type: 'select', options: ['Month', 'Hour'] },
      { id: 'signatoryName', label: 'Signatory Name', type: 'text' },
      { id: 'signatoryTitle', label: 'Signatory Title', type: 'text' },
    ]
  },
  {
    id: 'consultancy-standard',
    name: 'Consultancy Agreement',
    category: 'Consultancy',
    description: 'A standard agreement for independent consultants and technical advisors.',
    content: `[Date]

[Candidate Name]
[Candidate Address]

Subject: Consultancy Agreement - [Project Name]

Dear [Candidate Name],

This letter confirms the agreement between Nutrition International and yourself for consultancy services related to [Project Name].

1. Scope of Work:
[Detailed Scope of Work]

2. Duration:
The assignment will commence on [Start Date] and is expected to be completed by [End Date].

3. Fees and Payment:
Nutrition International will pay a consultancy fee of [Currency] [Daily Rate] per day, up to a maximum of [Total Days] days.

4. Deliverables:
- [Deliverable 1]
- [Deliverable 2]

5. Confidentiality:
You agree to maintain strict confidentiality regarding all information obtained during this assignment.

Signed,

[Signatory Name]
[Signatory Title]`,
    fields: [
      { id: 'date', label: 'Date', type: 'date', defaultValue: new Date().toLocaleDateString() },
      { id: 'candidateName', label: 'Candidate Name', type: 'text' },
      { id: 'candidateAddress', label: 'Candidate Address', type: 'textarea' },
      { id: 'projectName', label: 'Project Name', type: 'text' },
      { id: 'detailedScope', label: 'Detailed Scope of Work', type: 'textarea' },
      { id: 'startDate', label: 'Start Date', type: 'date' },
      { id: 'endDate', label: 'End Date', type: 'date' },
      { id: 'currency', label: 'Currency', type: 'text', defaultValue: 'USD' },
      { id: 'dailyRate', label: 'Daily Rate', type: 'number' },
      { id: 'totalDays', label: 'Total Days', type: 'number' },
      { id: 'deliverable1', label: 'Deliverable 1', type: 'text' },
      { id: 'deliverable2', label: 'Deliverable 2', type: 'text' },
      { id: 'signatoryName', label: 'Signatory Name', type: 'text' },
      { id: 'signatoryTitle', label: 'Signatory Title', type: 'text' },
    ]
  },
  {
    id: 'expat-letter',
    name: 'Expatriate Offer Letter',
    category: 'Expat',
    description: 'A comprehensive letter for international staff on expatriate terms.',
    content: `[Date]

PRIVATE AND CONFIDENTIAL
[Candidate Name]
[Candidate Address]

Dear [Candidate Name],

We are very pleased to offer you the position of [Job Title] with Nutrition International on an expatriate basis. 

Deployment Details:
Home Country: [Home Country]
Host Country: [Host Country]
Expected Start Date: [Start Date]

Compensation:
Your annual base salary will be [Currency] [Salary Amount].

Expatriate Benefits:
In addition to your base salary, you will receive:
- Relocation Allowance: [Relocation Amount]
- Housing Assistance: [Housing Amount] per month
- Home Leave: [Home Leave Frequency]
- Tax Equalization: Subject to Nutrition International Global Policy.

Full terms and conditions are attached in Appendix A.

Sincerely,

[Signatory Name]
[Signatory Title]`,
    fields: [
      { id: 'date', label: 'Date', type: 'date', defaultValue: new Date().toLocaleDateString() },
      { id: 'candidateName', label: 'Candidate Name', type: 'text' },
      { id: 'candidateAddress', label: 'Candidate Address', type: 'textarea' },
      { id: 'jobTitle', label: 'Job Title', type: 'text' },
      { id: 'homeCountry', label: 'Home Country', type: 'text' },
      { id: 'hostCountry', label: 'Host Country', type: 'text' },
      { id: 'startDate', label: 'Start Date', type: 'date' },
      { id: 'currency', label: 'Currency', type: 'text', defaultValue: 'USD' },
      { id: 'salaryAmount', label: 'Salary Amount', type: 'number' },
      { id: 'relocationAmount', label: 'Relocation Amount', type: 'text' },
      { id: 'housingAmount', label: 'Housing Amount', type: 'text' },
      { id: 'homeLeaveFrequency', label: 'Home Leave Frequency', type: 'text', defaultValue: 'Once per year' },
      { id: 'signatoryName', label: 'Signatory Name', type: 'text' },
      { id: 'signatoryTitle', label: 'Signatory Title', type: 'text' },
    ]
  }
];
