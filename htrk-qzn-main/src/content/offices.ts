/**
 * Municipal Office Directory
 * Update this file when the office directory sheet changes.
 */

export interface OfficeEntry {
  office: string;
  acronym: string;
  headLabel: string;
  headName: string;
  location: string;
}

export const offices: OfficeEntry[] = [
  { office: "Municipal Administrator's Office", acronym: "MAO", headLabel: "Head", headName: "Atty. Michael L. Cutor, CPA, Municipal Administrator", location: "Municipal Mayor's Office, 2F Quezon Municipal Hall" },
  { office: "Municipal Enterprise Management Office", acronym: "MEMO", headLabel: "Officer-in-Charge", headName: "Queeny Pearl C. Vargas, Executive Assistant II", location: "Municipal Complex, Libertad" },
  { office: "Sangguniang Bayan Office", acronym: "SBO", headLabel: "Officer-in-Charge", headName: "Exel Therese G. Talaba, Board Secretary IV", location: "Legislative Building, Municipal Complex, Libertad" },
  { office: "Municipal Treasurer's Office", acronym: "MTO", headLabel: "Head", headName: "Maria Aherma L. Baylomo, CPA, Municipal Treasurer", location: "1/F Executive Building, Municipal Complex, Libertad" },
  { office: "Municipal Assessor's Office", acronym: "MASSO", headLabel: "Acting Department Head", headName: "Ronald T. Ramao, MPA, REB, REA, Municipal Government Assistant Department Head", location: "1/F Executive Building, Municipal Complex, Libertad" },
  { office: "Municipal Accounting Office", acronym: "MACCO", headLabel: "Acting Department Head", headName: "Johnryan Anthony Q. Cabatac, CPA, Assistant Municipal Accountant", location: "2/F Executive Building, Municipal Complex, Libertad" },
  { office: "Municipal Budget Office", acronym: "MBO", headLabel: "Acting Department Head", headName: "Philip R. Florenosos, Municipal Government Assistant Department Head", location: "2/F Executive Building, Municipal Complex, Libertad" },
  { office: "Municipal Planning and Development Office", acronym: "MPDO", headLabel: "Officer-in-Charge", headName: "Jaireh James U. Pahalla, ME, Planning Officer III", location: "2/F Executive Building, Municipal Complex, Libertad" },
  { office: "Municipal Civil Registrar's Office", acronym: "MCRO", headLabel: "Officer-in-Charge", headName: "Annabelle A. Baluarte, Registration Officer II", location: "1/F Judiciary Building, Municipal Complex, Libertad" },
  { office: "Municipal Public Safety Office", acronym: "MPSO", headLabel: "Head", headName: "Marvin T. Enciso, Special Operations Officer V", location: "Municipal Complex, Libertad" },
  { office: "Human Resource Management Office", acronym: "HRMO", headLabel: "Officer-in-Charge", headName: "Gary A. Galarrita, Human Resource Management Officer III", location: "1/F Executive Building, Municipal Complex, Libertad" },
  { office: "Municipal Health Office", acronym: "MHO", headLabel: "Head", headName: "Lea Paula P. Catalan-Densing, MD, Municipal Health Officer/Chief of Hospital", location: "Quezon Health Center Infirmary, Blgy 4A, Poblacion" },
  { office: "Municipal Social Welfare and Development Office", acronym: "MSWDO", headLabel: "Head", headName: "Wena B. Pagayon, RSW, Municipal Social Welfare and Development Officer I", location: "Municipal Complex, Libertad" },
  { office: "Municipal Engineer's Office", acronym: "MEO", headLabel: "Head", headName: "Roy N. Niones, CE, Municipal Engineer", location: "Municipal Complex, Libertad" },
  { office: "Municipal Agriculture Office", acronym: "MAGRO", headLabel: "Head", headName: "Roque S. Pepito, ABE, Municipal Agriculturist", location: "Municipal Complex, Libertad" },
  { office: "Municipal Environment and Natural Resources Office", acronym: "MENRO", headLabel: "Head", headName: "Antonio M. Arcayera, CE, MGA, Municipal Environment and Natural Resources Officer", location: "Municipal Complex, Libertad" },
];
