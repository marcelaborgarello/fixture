import { Group, PlayoffPhase, Team } from '../types';

export const TEAMS: Record<string, Team> = {
  // GRUPO A
  MEX: { name: 'México', code: 'MEX', flagCode: 'MEX' },
  RSA: { name: 'Sudáfrica', code: 'RSA', flagCode: 'RSA' },
  KOR: { name: 'Corea del Sur', code: 'KOR', flagCode: 'KOR' },
  CZE: { name: 'Chequia', code: 'CZE', flagCode: 'CZE' },
  // GRUPO B
  CAN: { name: 'Canadá', code: 'CAN', flagCode: 'CAN' },
  QAT: { name: 'Qatar', code: 'QAT', flagCode: 'QAT' },
  SUI: { name: 'Suiza', code: 'SUI', flagCode: 'SUI' },
  BOS: { name: 'Bosnia', code: 'BOS', flagCode: 'BOS' },
  // GRUPO C
  BRA: { name: 'Brasil', code: 'BRA', flagCode: 'BRA' },
  MAR: { name: 'Marruecos', code: 'MAR', flagCode: 'MAR' },
  ESC: { name: 'Escocia', code: 'ESC', flagCode: 'ESC' },
  HAI: { name: 'Haití', code: 'HAI', flagCode: 'HAI' },
  // GRUPO D
  USA: { name: 'EE. UU.', code: 'USA', flagCode: 'USA' },
  PAR: { name: 'Paraguay', code: 'PAR', flagCode: 'PAR' },
  AUS: { name: 'Australia', code: 'AUS', flagCode: 'AUS' },
  TUR: { name: 'Turquía', code: 'TUR', flagCode: 'TUR' },
  // GRUPO E
  ALE: { name: 'Alemania', code: 'ALE', flagCode: 'ALE' },
  CDM: { name: 'Costa Marfil', code: 'CDM', flagCode: 'CDM' },
  ECU: { name: 'Ecuador', code: 'ECU', flagCode: 'ECU' },
  CUR: { name: 'Curazao', code: 'CUR', flagCode: 'CUR' },
  // GRUPO F
  PBA: { name: 'Países Bajos', code: 'PBA', flagCode: 'PBA' },
  SUE: { name: 'Suecia', code: 'SUE', flagCode: 'SUE' },
  JAP: { name: 'Japón', code: 'JAP', flagCode: 'JAP' },
  TUN: { name: 'Túnez', code: 'TUN', flagCode: 'TUN' },
  // GRUPO G
  BEL: { name: 'Bélgica', code: 'BEL', flagCode: 'BEL' },
  IRA: { name: 'Irán', code: 'IRA', flagCode: 'IRA' },
  EGI: { name: 'Egipto', code: 'EGI', flagCode: 'EGI' },
  NZL: { name: 'N. Zelanda', code: 'NZL', flagCode: 'NZL' },
  // GRUPO H
  ESP: { name: 'España', code: 'ESP', flagCode: 'ESP' },
  URU: { name: 'Uruguay', code: 'URU', flagCode: 'URU' },
  ARA: { name: 'Arabia Saudita', code: 'ARA', flagCode: 'ARA' },
  CAB: { name: 'Cabo Verde', code: 'CAB', flagCode: 'CAB' },
  // GRUPO I
  FRA: { name: 'Francia', code: 'FRA', flagCode: 'FRA' },
  SEN: { name: 'Senegal', code: 'SEN', flagCode: 'SEN' },
  NOR: { name: 'Noruega', code: 'NOR', flagCode: 'NOR' },
  IRK: { name: 'Irak', code: 'IRK', flagCode: 'IRK' },
  // GRUPO J
  ARG: { name: 'Argentina', code: 'ARG', flagCode: 'ARG' },
  ALG: { name: 'Argelia', code: 'ALG', flagCode: 'ALG' },
  AUT: { name: 'Austria', code: 'AUT', flagCode: 'AUT' },
  JOR: { name: 'Jordania', code: 'JOR', flagCode: 'JOR' },
  // GRUPO K
  POR: { name: 'Portugal', code: 'POR', flagCode: 'POR' },
  COL: { name: 'Colombia', code: 'COL', flagCode: 'COL' },
  UZB: { name: 'Uzbekistán', code: 'UZB', flagCode: 'UZB' },
  RDC: { name: 'RD del Congo', code: 'RDC', flagCode: 'RDC' },
  // GRUPO L
  ING: { name: 'Inglaterra', code: 'ING', flagCode: 'ING' },
  GHA: { name: 'Ghana', code: 'GHA', flagCode: 'GHA' },
  CRO: { name: 'Croacia', code: 'CRO', flagCode: 'CRO' },
  PAN: { name: 'Panamá', code: 'PAN', flagCode: 'PAN' }
};

export const GROUPS: Group[] = [
  {
    name: 'A',
    teams: [TEAMS.MEX, TEAMS.RSA, TEAMS.KOR, TEAMS.CZE],
    matches: [
      { id: 1, date: 'Jueves 11 de junio', time: '15:00 hs.', stadium: 'Estadio Ciudad de México', city: 'C. de México', homeTeam: TEAMS.MEX, awayTeam: TEAMS.RSA },
      { id: 2, date: 'Jueves 11 de junio', time: '22:00 hs.', stadium: 'Estadio Guadalajara', city: 'Guadalajara', homeTeam: TEAMS.KOR, awayTeam: TEAMS.CZE },
      { id: 3, date: 'Jueves 18 de junio', time: '12:00 hs.', stadium: 'Estadio Atlanta', city: 'Atlanta', homeTeam: TEAMS.CZE, awayTeam: TEAMS.RSA },
      { id: 4, date: 'Jueves 18 de junio', time: '21:00 hs.', stadium: 'Estadio Guadalajara', city: 'Guadalajara', homeTeam: TEAMS.MEX, awayTeam: TEAMS.KOR },
      { id: 5, date: 'Miércoles 24 de junio', time: '21:00 hs.', stadium: 'Estadio Monterrey', city: 'Monterrey', homeTeam: TEAMS.RSA, awayTeam: TEAMS.KOR },
      { id: 6, date: 'Miércoles 24 de junio', time: '21:00 hs.', stadium: 'Estadio Ciudad de México', city: 'C. de México', homeTeam: TEAMS.CZE, awayTeam: TEAMS.MEX }
    ]
  },
  {
    name: 'B',
    teams: [TEAMS.CAN, TEAMS.QAT, TEAMS.SUI, TEAMS.BOS],
    matches: [
      { id: 7, date: 'Viernes 12 de junio', time: '15:00 hs.', stadium: 'Estadio Toronto', city: 'Toronto', homeTeam: TEAMS.CAN, awayTeam: TEAMS.BOS },
      { id: 8, date: 'Sábado 13 de junio', time: '15:00 hs.', stadium: 'Estadio Bahía de San Francisco', city: 'San Francisco', homeTeam: TEAMS.QAT, awayTeam: TEAMS.SUI },
      { id: 9, date: 'Jueves 18 de junio', time: '15:00 hs.', stadium: 'Estadio Los Ángeles', city: 'Los Ángeles', homeTeam: TEAMS.SUI, awayTeam: TEAMS.BOS },
      { id: 10, date: 'Jueves 18 de junio', time: '18:00 hs.', stadium: 'Estadio BC Place Vancouver', city: 'Vancouver', homeTeam: TEAMS.CAN, awayTeam: TEAMS.QAT },
      { id: 11, date: 'Miércoles 24 de junio', time: '15:00 hs.', stadium: 'Estadio Seattle', city: 'Seattle', homeTeam: TEAMS.BOS, awayTeam: TEAMS.QAT },
      { id: 12, date: 'Miércoles 24 de junio', time: '15:00 hs.', stadium: 'Estadio BC Place Vancouver', city: 'Vancouver', homeTeam: TEAMS.SUI, awayTeam: TEAMS.CAN }
    ]
  },
  {
    name: 'C',
    teams: [TEAMS.BRA, TEAMS.MAR, TEAMS.ESC, TEAMS.HAI],
    matches: [
      { id: 13, date: 'Sábado 13 de junio', time: '18:00 hs.', stadium: 'Estadio Nueva York / New Jersey', city: 'NY/NJ', homeTeam: TEAMS.BRA, awayTeam: TEAMS.MAR },
      { id: 14, date: 'Sábado 13 de junio', time: '21:00 hs.', stadium: 'Estadio Gilette', city: 'Boston', homeTeam: TEAMS.HAI, awayTeam: TEAMS.ESC },
      { id: 15, date: 'Viernes 19 de junio', time: '18:00 hs.', stadium: 'Estadio Gilette', city: 'Boston', homeTeam: TEAMS.ESC, awayTeam: TEAMS.MAR },
      { id: 16, date: 'Viernes 19 de junio', time: '21:00 hs.', stadium: 'Estadio Filadelfia', city: 'Filadelfia', homeTeam: TEAMS.BRA, awayTeam: TEAMS.HAI },
      { id: 17, date: 'Miércoles 24 de junio', time: '18:00 hs.', stadium: 'Estadio Miami', city: 'Miami', homeTeam: TEAMS.ESC, awayTeam: TEAMS.BRA },
      { id: 18, date: 'Miércoles 24 de junio', time: '18:00 hs.', stadium: 'Estadio Ciudad de México', city: 'C. de México', homeTeam: TEAMS.MAR, awayTeam: TEAMS.HAI }
    ]
  },
  {
    name: 'D',
    teams: [TEAMS.USA, TEAMS.PAR, TEAMS.AUS, TEAMS.TUR],
    matches: [
      { id: 19, date: 'Viernes 12 de junio', time: '21:00 hs.', stadium: 'Estadio Los Ángeles', city: 'Los Ángeles', homeTeam: TEAMS.USA, awayTeam: TEAMS.PAR },
      { id: 20, date: 'Sábado 13 de junio', time: '00:00 hs.', stadium: 'Estadio BC Place Vancouver', city: 'Vancouver', homeTeam: TEAMS.AUS, awayTeam: TEAMS.TUR },
      { id: 21, date: 'Viernes 19 de junio', time: '15:00 hs.', stadium: 'Estadio Seattle', city: 'Seattle', homeTeam: TEAMS.USA, awayTeam: TEAMS.AUS },
      { id: 22, date: 'Viernes 19 de junio', time: '00:00 hs.', stadium: 'Estadio Bahía de San Francisco', city: 'San Francisco', homeTeam: TEAMS.TUR, awayTeam: TEAMS.PAR },
      { id: 23, date: 'Jueves 25 de junio', time: '22:00 hs.', stadium: 'Estadio Bahía de San Francisco', city: 'San Francisco', homeTeam: TEAMS.PAR, awayTeam: TEAMS.AUS },
      { id: 24, date: 'Jueves 25 de junio', time: '22:00 hs.', stadium: 'Estadio Los Ángeles', city: 'Los Ángeles', homeTeam: TEAMS.TUR, awayTeam: TEAMS.USA }
    ]
  },
  {
    name: 'E',
    teams: [TEAMS.ALE, TEAMS.CDM, TEAMS.ECU, TEAMS.CUR],
    matches: [
      { id: 25, date: 'Domingo 14 de junio', time: '12:00 hs.', stadium: 'Estadio Houston', city: 'Houston', homeTeam: TEAMS.ALE, awayTeam: TEAMS.CUR },
      { id: 26, date: 'Domingo 14 de junio', time: '19:00 hs.', stadium: 'Estadio Filadelfia', city: 'Filadelfia', homeTeam: TEAMS.CDM, awayTeam: TEAMS.ECU },
      { id: 27, date: 'Sábado 20 de junio', time: '16:00 hs.', stadium: 'Estadio Toronto', city: 'Toronto', homeTeam: TEAMS.ALE, awayTeam: TEAMS.CDM },
      { id: 28, date: 'Sábado 20 de junio', time: '22:00 hs.', stadium: 'Estadio Kansas City', city: 'Kansas City', homeTeam: TEAMS.ECU, awayTeam: TEAMS.CUR },
      { id: 29, date: 'Jueves 25 de junio', time: '16:00 hs.', stadium: 'Estadio Seattle', city: 'Seattle', homeTeam: TEAMS.CUR, awayTeam: TEAMS.CDM },
      { id: 30, date: 'Jueves 25 de junio', time: '16:00 hs.', stadium: 'Estadio Nueva York / New Jersey', city: 'NY/NJ', homeTeam: TEAMS.ECU, awayTeam: TEAMS.ALE }
    ]
  },
  {
    name: 'F',
    teams: [TEAMS.PBA, TEAMS.SUE, TEAMS.JAP, TEAMS.TUN],
    matches: [
      { id: 31, date: 'Domingo 14 de junio', time: '16:00 hs.', stadium: 'Estadio Dallas', city: 'Dallas', homeTeam: TEAMS.PBA, awayTeam: TEAMS.JAP },
      { id: 32, date: 'Domingo 14 de junio', time: '22:00 hs.', stadium: 'Estadio Monterrey', city: 'Monterrey', homeTeam: TEAMS.SUE, awayTeam: TEAMS.TUN },
      { id: 33, date: 'Sábado 20 de junio', time: '12:00 hs.', stadium: 'Estadio Houston', city: 'Houston', homeTeam: TEAMS.PBA, awayTeam: TEAMS.SUE },
      { id: 34, date: 'Sábado 20 de junio', time: '09:00 hs.', stadium: 'Estadio Monterrey', city: 'Monterrey', homeTeam: TEAMS.TUN, awayTeam: TEAMS.JAP },
      { id: 35, date: 'Jueves 25 de junio', time: '19:00 hs.', stadium: 'Estadio Dallas', city: 'Dallas', homeTeam: TEAMS.JAP, awayTeam: TEAMS.SUE },
      { id: 36, date: 'Jueves 25 de junio', time: '19:00 hs.', stadium: 'Estadio Kansas City', city: 'Kansas City', homeTeam: TEAMS.TUN, awayTeam: TEAMS.PBA }
    ]
  },
  {
    name: 'G',
    teams: [TEAMS.BEL, TEAMS.IRA, TEAMS.EGI, TEAMS.NZL],
    matches: [
      { id: 37, date: 'Lunes 15 de junio', time: '15:00 hs.', stadium: 'Estadio Seattle', city: 'Seattle', homeTeam: TEAMS.BEL, awayTeam: TEAMS.EGI },
      { id: 38, date: 'Lunes 15 de junio', time: '21:00 hs.', stadium: 'Estadio Los Ángeles', city: 'Los Ángeles', homeTeam: TEAMS.IRA, awayTeam: TEAMS.NZL },
      { id: 39, date: 'Domingo 21 de junio', time: '15:00 hs.', stadium: 'Estadio Los Ángeles', city: 'Los Ángeles', homeTeam: TEAMS.BEL, awayTeam: TEAMS.IRA },
      { id: 40, date: 'Domingo 21 de junio', time: '00:00 hs.', stadium: 'Estadio BC Place Vancouver', city: 'Vancouver', homeTeam: TEAMS.NZL, awayTeam: TEAMS.EGI },
      { id: 41, date: 'Sábado 27 de junio', time: '23:00 hs.', stadium: 'Estadio BC Place Vancouver', city: 'Vancouver', homeTeam: TEAMS.NZL, awayTeam: TEAMS.BEL },
      { id: 42, date: 'Sábado 27 de junio', time: '23:00 hs.', stadium: 'Estadio Seattle', city: 'Seattle', homeTeam: TEAMS.EGI, awayTeam: TEAMS.IRA }
    ]
  },
  {
    name: 'H',
    teams: [TEAMS.ESP, TEAMS.URU, TEAMS.ARA, TEAMS.CAB],
    matches: [
      { id: 43, date: 'Lunes 15 de junio', time: '12:00 hs.', stadium: 'Estadio Atlanta', city: 'Atlanta', homeTeam: TEAMS.ESP, awayTeam: TEAMS.CAB },
      { id: 44, date: 'Lunes 15 de junio', time: '18:00 hs.', stadium: 'Estadio Houston', city: 'Houston', homeTeam: TEAMS.ARA, awayTeam: TEAMS.URU },
      { id: 45, date: 'Domingo 21 de junio', time: '12:00 hs.', stadium: 'Estadio Atlanta', city: 'Atlanta', homeTeam: TEAMS.ESP, awayTeam: TEAMS.ARA },
      { id: 46, date: 'Domingo 21 de junio', time: '18:00 hs.', stadium: 'Estadio Miami', city: 'Miami', homeTeam: TEAMS.URU, awayTeam: TEAMS.CAB },
      { id: 47, date: 'Viernes 26 de junio', time: '20:00 hs.', stadium: 'Estadio Miami', city: 'Miami', homeTeam: TEAMS.CAB, awayTeam: TEAMS.ARA },
      { id: 48, date: 'Viernes 26 de junio', time: '20:00 hs.', stadium: 'Estadio Guadalajara', city: 'Guadalajara', homeTeam: TEAMS.URU, awayTeam: TEAMS.ESP }
    ]
  },
  {
    name: 'I',
    teams: [TEAMS.FRA, TEAMS.SEN, TEAMS.NOR, TEAMS.IRK],
    matches: [
      { id: 49, date: 'Martes 16 de junio', time: '15:00 hs.', stadium: 'Estadio Nueva York / New Jersey', city: 'NY/NJ', homeTeam: TEAMS.FRA, awayTeam: TEAMS.SEN },
      { id: 50, date: 'Martes 16 de junio', time: '18:00 hs.', stadium: 'Estadio Boston', city: 'Boston', homeTeam: TEAMS.IRK, awayTeam: TEAMS.NOR },
      { id: 51, date: 'Lunes 22 de junio', time: '17:00 hs.', stadium: 'Estadio Filadelfia', city: 'Filadelfia', homeTeam: TEAMS.FRA, awayTeam: TEAMS.IRK },
      { id: 52, date: 'Lunes 22 de junio', time: '20:00 hs.', stadium: 'Estadio Nueva York / New Jersey', city: 'NY/NJ', homeTeam: TEAMS.NOR, awayTeam: TEAMS.SEN },
      { id: 53, date: 'Viernes 26 de junio', time: '15:00 hs.', stadium: 'Estadio Toronto', city: 'Toronto', homeTeam: TEAMS.SEN, awayTeam: TEAMS.IRK },
      { id: 54, date: 'Viernes 26 de junio', time: '15:00 hs.', stadium: 'Estadio Boston', city: 'Boston', homeTeam: TEAMS.NOR, awayTeam: TEAMS.FRA }
    ]
  },
  {
    name: 'J',
    teams: [TEAMS.ARG, TEAMS.ALG, TEAMS.AUT, TEAMS.JOR],
    matches: [
      { id: 55, date: 'Martes 16 de junio', time: '21:00 hs.', stadium: 'Estadio Kansas City', city: 'Kansas City', homeTeam: TEAMS.ARG, awayTeam: TEAMS.ALG },
      { id: 56, date: 'Martes 16 de junio', time: '00:00 hs.', stadium: 'Estadio Bahía de San Francisco', city: 'San Francisco', homeTeam: TEAMS.AUT, awayTeam: TEAMS.JOR },
      { id: 57, date: 'Lunes 22 de junio', time: '12:00 hs.', stadium: 'Estadio Dallas', city: 'Dallas', homeTeam: TEAMS.ARG, awayTeam: TEAMS.AUT },
      { id: 58, date: 'Lunes 22 de junio', time: '22:00 hs.', stadium: 'Estadio Bahía de San Francisco', city: 'San Francisco', homeTeam: TEAMS.JOR, awayTeam: TEAMS.ALG },
      { id: 59, date: 'Sábado 27 de junio', time: '22:00 hs.', stadium: 'Estadio Kansas City', city: 'Kansas City', homeTeam: TEAMS.ALG, awayTeam: TEAMS.AUT },
      { id: 60, date: 'Sábado 27 de junio', time: '22:00 hs.', stadium: 'Estadio Dallas', city: 'Dallas', homeTeam: TEAMS.JOR, awayTeam: TEAMS.ARG }
    ]
  },
  {
    name: 'K',
    teams: [TEAMS.POR, TEAMS.COL, TEAMS.UZB, TEAMS.RDC],
    matches: [
      { id: 61, date: 'Miércoles 17 de junio', time: '13:00 hs.', stadium: 'Estadio Houston', city: 'Houston', homeTeam: TEAMS.POR, awayTeam: TEAMS.RDC },
      { id: 62, date: 'Miércoles 17 de junio', time: '22:00 hs.', stadium: 'Estadio Ciudad de México', city: 'C. de México', homeTeam: TEAMS.UZB, awayTeam: TEAMS.COL },
      { id: 63, date: 'Martes 23 de junio', time: '13:00 hs.', stadium: 'Estadio Houston', city: 'Houston', homeTeam: TEAMS.POR, awayTeam: TEAMS.UZB },
      { id: 64, date: 'Martes 23 de junio', time: '22:00 hs.', stadium: 'Estadio Guadalajara', city: 'Guadalajara', homeTeam: TEAMS.COL, awayTeam: TEAMS.RDC },
      { id: 65, date: 'Sábado 27 de junio', time: '19:30 hs.', stadium: 'Estadio Atlanta', city: 'Atlanta', homeTeam: TEAMS.RDC, awayTeam: TEAMS.UZB },
      { id: 66, date: 'Sábado 27 de junio', time: '19:30 hs.', stadium: 'Estadio Miami', city: 'Miami', homeTeam: TEAMS.COL, awayTeam: TEAMS.POR }
    ]
  },
  {
    name: 'L',
    teams: [TEAMS.ING, TEAMS.GHA, TEAMS.CRO, TEAMS.PAN],
    matches: [
      { id: 67, date: 'Miércoles 17 de junio', time: '16:00 hs.', stadium: 'Estadio Dallas', city: 'Dallas', homeTeam: TEAMS.ING, awayTeam: TEAMS.CRO },
      { id: 68, date: 'Miércoles 17 de junio', time: '19:00 hs.', stadium: 'Estadio Toronto', city: 'Toronto', homeTeam: TEAMS.GHA, awayTeam: TEAMS.PAN },
      { id: 69, date: 'Martes 23 de junio', time: '16:00 hs.', stadium: 'Estadio Boston', city: 'Boston', homeTeam: TEAMS.ING, awayTeam: TEAMS.GHA },
      { id: 70, date: 'Martes 23 de junio', time: '19:00 hs.', stadium: 'Estadio Toronto', city: 'Toronto', homeTeam: TEAMS.PAN, awayTeam: TEAMS.CRO },
      { id: 71, date: 'Sábado 27 de junio', time: '17:00 hs.', stadium: 'Estadio Filadelfia', city: 'Filadelfia', homeTeam: TEAMS.CRO, awayTeam: TEAMS.GHA },
      { id: 72, date: 'Sábado 27 de junio', time: '17:00 hs.', stadium: 'Estadio Nueva York / New Jersey', city: 'NY/NJ', homeTeam: TEAMS.PAN, awayTeam: TEAMS.ING }
    ]
  }
];

export const PLAYOFFS: PlayoffPhase[] = [
  {
    name: 'DIECISEISAVOS',
    matches: [
      { id: 73, date: 'Domingo 28 de junio', time: 'Part. 73', stadium: 'Estadio Los Ángeles', city: 'Los Ángeles', homeTeam: '2A', awayTeam: '2B' },
      { id: 74, date: 'Lunes 29 de junio', time: 'Part. 74', stadium: 'Estadio Boston', city: 'Boston', homeTeam: '1E', awayTeam: '3A/B/C/D' },
      { id: 75, date: 'Lunes 29 de junio', time: 'Part. 75', stadium: 'Estadio Monterrey', city: 'Monterrey', homeTeam: '1F', awayTeam: '2C' },
      { id: 76, date: 'Lunes 29 de junio', time: 'Part. 76', stadium: 'Estadio Houston', city: 'Houston', homeTeam: '1C', awayTeam: '2F' },
      { id: 77, date: 'Martes 30 de junio', time: 'Part. 77', stadium: 'Estadio Nueva York', city: 'NY/NJ', homeTeam: '1I', awayTeam: '3C/D/E/F' },
      { id: 78, date: 'Martes 30 de junio', time: 'Part. 78', stadium: 'Estadio Dallas', city: 'Dallas', homeTeam: '2E', awayTeam: '2I' },
      { id: 79, date: 'Martes 30 de junio', time: 'Part. 79', stadium: 'Estadio Ciudad de México', city: 'C. de México', homeTeam: '1A', awayTeam: '3E/F/G/H' },
      { id: 80, date: 'Miércoles 1 de julio', time: 'Part. 80', stadium: 'Estadio San Francisco', city: 'San Francisco', homeTeam: '1L', awayTeam: '3I/J/K/L' },
      { id: 81, date: 'Miércoles 1 de julio', time: 'Part. 81', stadium: 'Estadio Seattle', city: 'Seattle', homeTeam: '1D', awayTeam: '3G/H/I/J' },
      { id: 82, date: 'Miércoles 1 de julio', time: 'Part. 82', stadium: 'Estadio Toronto', city: 'Toronto', homeTeam: '1G', awayTeam: '3K/L/A/B' },
      { id: 83, date: 'Jueves 2 de julio', time: 'Part. 83', stadium: 'Estadio Vancouver', city: 'Vancouver', homeTeam: '2K', awayTeam: '2L' },
      { id: 84, date: 'Jueves 2 de julio', time: 'Part. 84', stadium: 'Estadio Atlanta', city: 'Atlanta', homeTeam: '1H', awayTeam: '2J' },
      { id: 85, date: 'Viernes 3 de julio', time: 'Part. 85', stadium: 'Estadio Miami', city: 'Miami', homeTeam: '1B', awayTeam: '3A/B/C/D' },
      { id: 86, date: 'Viernes 3 de julio', time: 'Part. 86', stadium: 'Estadio Guadalajara', city: 'Guadalajara', homeTeam: '1J', awayTeam: '2H' },
      { id: 87, date: 'Viernes 3 de julio', time: 'Part. 87', stadium: 'Estadio Filadelfia', city: 'Filadelfia', homeTeam: '1K', awayTeam: '3I/J/K/L' },
      { id: 88, date: 'Sábado 4 de julio', time: 'Part. 88', stadium: 'Estadio Kansas City', city: 'Kansas City', homeTeam: '2D', awayTeam: '2G' }
    ]
  },
  {
    name: 'OCTAVOS DE FINAL',
    matches: [
      { id: 89, date: 'Sábado 4 de julio', time: 'Part. 89', stadium: 'Estadio Filadelfia', city: 'Filadelfia', homeTeam: 'G74', awayTeam: 'G77' },
      { id: 90, date: 'Sábado 4 de julio', time: 'Part. 90', stadium: 'Estadio Houston', city: 'Houston', homeTeam: 'G73', awayTeam: 'G75' },
      { id: 91, date: 'Domingo 5 de julio', time: 'Part. 91', stadium: 'Estadio Nueva York', city: 'NY/NJ', homeTeam: 'G76', awayTeam: 'G78' },
      { id: 92, date: 'Domingo 5 de julio', time: 'Part. 92', stadium: 'Estadio C. de México', city: 'C. de México', homeTeam: 'G79', awayTeam: 'G80' },
      { id: 93, date: 'Lunes 6 de julio', time: 'Part. 93', stadium: 'Estadio Seattle', city: 'Seattle', homeTeam: 'G83', awayTeam: 'G84' },
      { id: 94, date: 'Lunes 6 de julio', time: 'Part. 94', stadium: 'Estadio Vancouver', city: 'Vancouver', homeTeam: 'G81', awayTeam: 'G82' },
      { id: 95, date: 'Martes 7 de julio', time: 'Part. 95', stadium: 'Estadio Atlanta', city: 'Atlanta', homeTeam: 'G86', awayTeam: 'G88' },
      { id: 96, date: 'Martes 7 de julio', time: 'Part. 96', stadium: 'Estadio Boston', city: 'Boston', homeTeam: 'G85', awayTeam: 'G87' }
    ]
  },
  {
    name: 'CUARTOS DE FINAL',
    matches: [
      { id: 97, date: 'Jueves 9 de julio', time: 'Part. 97', stadium: 'Estadio Boston', city: 'Boston', homeTeam: 'G89', awayTeam: 'G90' },
      { id: 98, date: 'Viernes 10 de julio', time: 'Part. 98', stadium: 'Estadio Los Ángeles', city: 'Los Ángeles', homeTeam: 'G93', awayTeam: 'G94' },
      { id: 99, date: 'Sábado 11 de julio', time: 'Part. 99', stadium: 'Estadio Miami', city: 'Miami', homeTeam: 'G91', awayTeam: 'G92' },
      { id: 100, date: 'Sábado 11 de julio', time: 'Part. 100', stadium: 'Estadio Kansas City', city: 'Kansas City', homeTeam: 'G95', awayTeam: 'G96' }
    ]
  },
  {
    name: 'FASE FINAL',
    matches: [
      // Semifinales
      { id: 101, date: 'Martes 14 de julio', time: 'Part. 101', stadium: 'Estadio Dallas', city: 'Dallas', homeTeam: 'G97', awayTeam: 'G98' },
      { id: 102, date: 'Miércoles 15 de julio', time: 'Part. 102', stadium: 'Estadio Atlanta', city: 'Atlanta', homeTeam: 'G99', awayTeam: 'G100' },
      // 3er y 4to Puesto
      { id: 103, date: 'Sábado 18 de julio', time: 'Part. 103', stadium: 'Estadio Miami', city: 'Miami', homeTeam: 'P101', awayTeam: 'P102' },
      // Gran Final
      { id: 104, date: 'Domingo 19 de julio', time: 'Part. 104', stadium: 'Estadio MetLife NY', city: 'New Jersey', homeTeam: 'G101', awayTeam: 'G102' }
    ]
  }
];
