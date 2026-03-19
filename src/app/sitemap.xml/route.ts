import { NextResponse } from "next/server";

const locationData = [
  {
    county: "Greater London",
    slug: "greater-london",
    towns: [
      { name: "City of London", slug: "city-of-london", postcode: "EC2" },
      { name: "Canary Wharf", slug: "canary-wharf", postcode: "E14" },
      { name: "Croydon", slug: "croydon", postcode: "CR0" },
      { name: "Hackney", slug: "hackney", postcode: "E8" },
      { name: "Brixton", slug: "brixton", postcode: "SW2" },
      { name: "Lewisham", slug: "lewisham", postcode: "SE13" },
      { name: "Camden", slug: "camden", postcode: "NW1" },
      { name: "Stratford", slug: "stratford", postcode: "E15" },
    ],
  },
  {
    county: "Greater Manchester",
    slug: "greater-manchester",
    towns: [
      { name: "Manchester", slug: "manchester", postcode: "M1" },
      { name: "Salford", slug: "salford", postcode: "M5" },
      { name: "Bolton", slug: "bolton", postcode: "BL1" },
      { name: "Oldham", slug: "oldham", postcode: "OL1" },
      { name: "Stockport", slug: "stockport", postcode: "SK1" },
      { name: "Wigan", slug: "wigan", postcode: "WN1" },
    ],
  },
  {
    county: "West Yorkshire",
    slug: "west-yorkshire",
    towns: [
      { name: "Leeds", slug: "leeds", postcode: "LS1" },
      { name: "Bradford", slug: "bradford", postcode: "BD1" },
      { name: "Halifax", slug: "halifax", postcode: "HX1" },
      { name: "Huddersfield", slug: "huddersfield", postcode: "HD1" },
      { name: "Wakefield", slug: "wakefield", postcode: "WF1" },
    ],
  },
  {
    county: "West Midlands",
    slug: "west-midlands",
    towns: [
      { name: "Birmingham", slug: "birmingham", postcode: "B1" },
      { name: "Coventry", slug: "coventry", postcode: "CV1" },
      { name: "Wolverhampton", slug: "wolverhampton", postcode: "WV1" },
      { name: "Dudley", slug: "dudley", postcode: "DY1" },
      { name: "Solihull", slug: "solihull", postcode: "B91" },
    ],
  },
  {
    county: "Merseyside",
    slug: "merseyside",
    towns: [
      { name: "Liverpool", slug: "liverpool", postcode: "L1" },
      { name: "Birkenhead", slug: "birkenhead", postcode: "CH41" },
      { name: "St Helens", slug: "st-helens", postcode: "WA10" },
      { name: "Southport", slug: "southport", postcode: "PR8" },
      { name: "Bootle", slug: "bootle", postcode: "L20" },
    ],
  },
  {
    county: "South Yorkshire",
    slug: "south-yorkshire",
    towns: [
      { name: "Sheffield", slug: "sheffield", postcode: "S1" },
      { name: "Doncaster", slug: "doncaster", postcode: "DN1" },
      { name: "Rotherham", slug: "rotherham", postcode: "S60" },
      { name: "Barnsley", slug: "barnsley", postcode: "S70" },
      { name: "Chapeltown", slug: "chapeltown", postcode: "S35" },
    ],
  },
  {
    county: "Tyne and Wear",
    slug: "tyne-and-wear",
    towns: [
      { name: "Newcastle upon Tyne", slug: "newcastle-upon-tyne", postcode: "NE1" },
      { name: "Sunderland", slug: "sunderland", postcode: "SR1" },
      { name: "Gateshead", slug: "gateshead", postcode: "NE8" },
      { name: "South Shields", slug: "south-shields", postcode: "NE33" },
      { name: "Tynemouth", slug: "tynemouth", postcode: "NE30" },
    ],
  },
  {
    county: "Kent",
    slug: "kent",
    towns: [
      { name: "Maidstone", slug: "maidstone", postcode: "ME14" },
      { name: "Canterbury", slug: "canterbury", postcode: "CT1" },
      { name: "Gravesend", slug: "gravesend", postcode: "DA11" },
      { name: "Folkestone", slug: "folkestone", postcode: "CT20" },
      { name: "Ashford", slug: "ashford", postcode: "TN23" },
    ],
  },
  {
    county: "Essex",
    slug: "essex",
    towns: [
      { name: "Chelmsford", slug: "chelmsford", postcode: "CM1" },
      { name: "Southend-on-Sea", slug: "southend-on-sea", postcode: "SS1" },
      { name: "Colchester", slug: "colchester", postcode: "CO1" },
      { name: "Basildon", slug: "basildon", postcode: "SS13" },
      { name: "Harlow", slug: "harlow", postcode: "CM20" },
    ],
  },
  {
    county: "Hampshire",
    slug: "hampshire",
    towns: [
      { name: "Southampton", slug: "southampton", postcode: "SO14" },
      { name: "Portsmouth", slug: "portsmouth", postcode: "PO1" },
      { name: "Basingstoke", slug: "basingstoke", postcode: "RG21" },
      { name: "Winchester", slug: "winchester", postcode: "SO23" },
      { name: "Eastleigh", slug: "eastleigh", postcode: "SO50" },
    ],
  },
  {
    county: "Lancashire",
    slug: "lancashire",
    towns: [
      { name: "Preston", slug: "preston", postcode: "PR1" },
      { name: "Blackpool", slug: "blackpool", postcode: "FY1" },
      { name: "Blackburn", slug: "blackburn", postcode: "BB1" },
      { name: "Burnley", slug: "burnley", postcode: "BB11" },
      { name: "Lancaster", slug: "lancaster", postcode: "LA1" },
    ],
  },
  {
    county: "Surrey",
    slug: "surrey",
    towns: [
      { name: "Guildford", slug: "guildford", postcode: "GU1" },
      { name: "Woking", slug: "woking", postcode: "GU21" },
      { name: "Reigate", slug: "reigate", postcode: "RH2" },
      { name: "Epsom", slug: "epsom", postcode: "KT17" },
      { name: "Farnham", slug: "farnham", postcode: "GU9" },
    ],
  },
  {
    county: "Hertfordshire",
    slug: "hertfordshire",
    towns: [
      { name: "Watford", slug: "watford", postcode: "WD17" },
      { name: "St Albans", slug: "st-albans", postcode: "AL1" },
      { name: "Hemel Hempstead", slug: "hemel-hempstead", postcode: "HP1" },
      { name: "Stevenage", slug: "stevenage", postcode: "SG1" },
      { name: "Hatfield", slug: "hatfield", postcode: "AL10" },
    ],
  },
  {
    county: "Nottinghamshire",
    slug: "nottinghamshire",
    towns: [
      { name: "Nottingham", slug: "nottingham", postcode: "NG1" },
      { name: "Mansfield", slug: "mansfield", postcode: "NG18" },
      { name: "Newark-on-Trent", slug: "newark-on-trent", postcode: "NG24" },
      { name: "Worksop", slug: "worksop", postcode: "S80" },
      { name: "Retford", slug: "retford", postcode: "DN22" },
    ],
  },
  {
    county: "Derbyshire",
    slug: "derbyshire",
    towns: [
      { name: "Derby", slug: "derby", postcode: "DE1" },
      { name: "Chesterfield", slug: "chesterfield", postcode: "S40" },
      { name: "Buxton", slug: "buxton", postcode: "SK17" },
      { name: "Ilkeston", slug: "ilkeston", postcode: "DE7" },
      { name: "Matlock", slug: "matlock", postcode: "DE4" },
    ],
  },
  {
    county: "Leicestershire",
    slug: "leicestershire",
    towns: [
      { name: "Leicester", slug: "leicester", postcode: "LE1" },
      { name: "Loughborough", slug: "loughborough", postcode: "LE11" },
      { name: "Hinckley", slug: "hinckley", postcode: "LE10" },
      { name: "Melton Mowbray", slug: "melton-mowbray", postcode: "LE13" },
      { name: "Market Harborough", slug: "market-harborough", postcode: "LE16" },
    ],
  },
  {
    county: "Staffordshire",
    slug: "staffordshire",
    towns: [
      { name: "Stafford", slug: "stafford", postcode: "ST16" },
      { name: "Stoke-on-Trent", slug: "stoke-on-trent", postcode: "ST1" },
      { name: "Burton upon Trent", slug: "burton-upon-trent", postcode: "DE14" },
      { name: "Lichfield", slug: "lichfield", postcode: "WS13" },
      { name: "Tamworth", slug: "tamworth", postcode: "B77" },
    ],
  },
  {
    county: "Somerset",
    slug: "somerset",
    towns: [
      { name: "Taunton", slug: "taunton", postcode: "TA1" },
      { name: "Bath", slug: "bath", postcode: "BA1" },
      { name: "Weston-super-Mare", slug: "weston-super-mare", postcode: "BS23" },
      { name: "Yeovil", slug: "yeovil", postcode: "BA20" },
      { name: "Bridgwater", slug: "bridgwater", postcode: "TA6" },
    ],
  },
  {
    county: "Norfolk",
    slug: "norfolk",
    towns: [
      { name: "Norwich", slug: "norwich", postcode: "NR1" },
      { name: "Kings Lynn", slug: "kings-lynn", postcode: "PE30" },
      { name: "Great Yarmouth", slug: "great-yarmouth", postcode: "NR30" },
      { name: "Dereham", slug: "dereham", postcode: "NR19" },
      { name: "Fakenham", slug: "fakenham", postcode: "NR21" },
    ],
  },
  {
    county: "Suffolk",
    slug: "suffolk",
    towns: [
      { name: "Ipswich", slug: "ipswich", postcode: "IP1" },
      { name: "Bury St Edmunds", slug: "bury-st-edmunds", postcode: "IP33" },
      { name: "Lowestoft", slug: "lowestoft", postcode: "NR32" },
      { name: "Newmarket", slug: "newmarket", postcode: "CB8" },
      { name: "Sudbury", slug: "sudbury", postcode: "CO10" },
    ],
  },
  {
    county: "Northamptonshire",
    slug: "northamptonshire",
    towns: [
      { name: "Northampton", slug: "northampton", postcode: "NN1" },
      { name: "Kettering", slug: "kettering", postcode: "NN15" },
      { name: "Wellingborough", slug: "wellingborough", postcode: "NN8" },
      { name: "Corby", slug: "corby", postcode: "NN17" },
      { name: "Daventry", slug: "daventry", postcode: "NN11" },
    ],
  },
  {
    county: "Cambridgeshire",
    slug: "cambridgeshire",
    towns: [
      { name: "Cambridge", slug: "cambridge", postcode: "CB1" },
      { name: "Peterborough", slug: "peterborough", postcode: "PE1" },
      { name: "Ely", slug: "ely", postcode: "CB7" },
      { name: "Huntingdon", slug: "huntingdon", postcode: "PE29" },
      { name: "March", slug: "march", postcode: "PE15" },
    ],
  },
  {
    county: "Oxfordshire",
    slug: "oxfordshire",
    towns: [
      { name: "Oxford", slug: "oxford", postcode: "OX1" },
      { name: "Banbury", slug: "banbury", postcode: "OX16" },
      { name: "Abingdon", slug: "abingdon", postcode: "OX14" },
      { name: "Witney", slug: "witney", postcode: "OX28" },
      { name: "Bicester", slug: "bicester", postcode: "OX26" },
    ],
  },
  {
    county: "Berkshire",
    slug: "berkshire",
    towns: [
      { name: "Reading", slug: "reading", postcode: "RG1" },
      { name: "Slough", slug: "slough", postcode: "SL1" },
      { name: "Windsor", slug: "windsor", postcode: "SL4" },
      { name: "Bracknell", slug: "bracknell", postcode: "RG12" },
      { name: "Newbury", slug: "newbury", postcode: "RG14" },
    ],
  },
  {
    county: "Bristol",
    slug: "bristol",
    towns: [
      { name: "Bristol City Centre", slug: "bristol-city-centre", postcode: "BS1" },
      { name: "Clifton", slug: "clifton", postcode: "BS8" },
      { name: "Bedminster", slug: "bedminster", postcode: "BS3" },
      { name: "Fishponds", slug: "fishponds", postcode: "BS16" },
      { name: "Horfield", slug: "horfield", postcode: "BS7" },
    ],
  },
  {
    county: "Devon",
    slug: "devon",
    towns: [
      { name: "Exeter", slug: "exeter", postcode: "EX1" },
      { name: "Plymouth", slug: "plymouth", postcode: "PL1" },
      { name: "Torquay", slug: "torquay", postcode: "TQ1" },
      { name: "Barnstaple", slug: "barnstaple", postcode: "EX31" },
      { name: "Newton Abbot", slug: "newton-abbot", postcode: "TQ12" },
    ],
  },
  {
    county: "Cornwall",
    slug: "cornwall",
    towns: [
      { name: "Truro", slug: "truro", postcode: "TR1" },
      { name: "Falmouth", slug: "falmouth", postcode: "TR11" },
      { name: "Penzance", slug: "penzance", postcode: "TR18" },
      { name: "St Austell", slug: "st-austell", postcode: "PL25" },
      { name: "Newquay", slug: "newquay", postcode: "TR7" },
    ],
  },
  {
    county: "Cheshire",
    slug: "cheshire",
    towns: [
      { name: "Chester", slug: "chester", postcode: "CH1" },
      { name: "Crewe", slug: "crewe", postcode: "CW1" },
      { name: "Warrington", slug: "warrington", postcode: "WA1" },
      { name: "Macclesfield", slug: "macclesfield", postcode: "SK10" },
      { name: "Ellesmere Port", slug: "ellesmere-port", postcode: "CH65" },
    ],
  },
  {
    county: "Durham",
    slug: "durham",
    towns: [
      { name: "Durham City", slug: "durham-city", postcode: "DH1" },
      { name: "Darlington", slug: "darlington", postcode: "DL1" },
      { name: "Hartlepool", slug: "hartlepool", postcode: "TS24" },
      { name: "Bishop Auckland", slug: "bishop-auckland", postcode: "DL14" },
      { name: "Peterlee", slug: "peterlee", postcode: "SR8" },
    ],
  },
  {
    county: "Northumberland",
    slug: "northumberland",
    towns: [
      { name: "Alnwick", slug: "alnwick", postcode: "NE66" },
      { name: "Morpeth", slug: "morpeth", postcode: "NE61" },
      { name: "Hexham", slug: "hexham", postcode: "NE46" },
      { name: "Blyth", slug: "blyth", postcode: "NE24" },
      { name: "Cramlington", slug: "cramlington", postcode: "NE23" },
    ],
  },
  {
    county: "Cumbria",
    slug: "cumbria",
    towns: [
      { name: "Carlisle", slug: "carlisle", postcode: "CA1" },
      { name: "Barrow-in-Furness", slug: "barrow-in-furness", postcode: "LA14" },
      { name: "Kendal", slug: "kendal", postcode: "LA9" },
      { name: "Workington", slug: "workington", postcode: "CA14" },
      { name: "Whitehaven", slug: "whitehaven", postcode: "CA28" },
    ],
  },
  {
    county: "Lincolnshire",
    slug: "lincolnshire",
    towns: [
      { name: "Lincoln", slug: "lincoln", postcode: "LN1" },
      { name: "Grimsby", slug: "grimsby", postcode: "DN31" },
      { name: "Boston", slug: "boston", postcode: "PE21" },
      { name: "Grantham", slug: "grantham", postcode: "NG31" },
      { name: "Scunthorpe", slug: "scunthorpe", postcode: "DN15" },
    ],
  },
  {
    county: "Worcestershire",
    slug: "worcestershire",
    towns: [
      { name: "Worcester", slug: "worcester", postcode: "WR1" },
      { name: "Kidderminster", slug: "kidderminster", postcode: "DY10" },
      { name: "Redditch", slug: "redditch", postcode: "B97" },
      { name: "Bromsgrove", slug: "bromsgrove", postcode: "B60" },
      { name: "Malvern", slug: "malvern", postcode: "WR14" },
    ],
  },
  {
    county: "Warwickshire",
    slug: "warwickshire",
    towns: [
      { name: "Warwick", slug: "warwick", postcode: "CV34" },
      { name: "Nuneaton", slug: "nuneaton", postcode: "CV11" },
      { name: "Rugby", slug: "rugby", postcode: "CV21" },
      { name: "Leamington Spa", slug: "leamington-spa", postcode: "CV31" },
      { name: "Stratford-upon-Avon", slug: "stratford-upon-avon", postcode: "CV37" },
    ],
  },
  {
    county: "Buckinghamshire",
    slug: "buckinghamshire",
    towns: [
      { name: "Milton Keynes", slug: "milton-keynes", postcode: "MK1" },
      { name: "High Wycombe", slug: "high-wycombe", postcode: "HP11" },
      { name: "Aylesbury", slug: "aylesbury", postcode: "HP20" },
      { name: "Marlow", slug: "marlow", postcode: "SL7" },
      { name: "Amersham", slug: "amersham", postcode: "HP6" },
    ],
  },
  {
    county: "East Sussex",
    slug: "east-sussex",
    towns: [
      { name: "Brighton", slug: "brighton", postcode: "BN1" },
      { name: "Eastbourne", slug: "eastbourne", postcode: "BN21" },
      { name: "Hastings", slug: "hastings", postcode: "TN34" },
      { name: "Lewes", slug: "lewes", postcode: "BN7" },
      { name: "Bexhill-on-Sea", slug: "bexhill-on-sea", postcode: "TN39" },
    ],
  },
  {
    county: "West Sussex",
    slug: "west-sussex",
    towns: [
      { name: "Chichester", slug: "chichester", postcode: "PO19" },
      { name: "Crawley", slug: "crawley", postcode: "RH10" },
      { name: "Worthing", slug: "worthing", postcode: "BN11" },
      { name: "Horsham", slug: "horsham", postcode: "RH12" },
      { name: "Bognor Regis", slug: "bognor-regis", postcode: "PO21" },
    ],
  },
  {
    county: "Gloucestershire",
    slug: "gloucestershire",
    towns: [
      { name: "Gloucester", slug: "gloucester", postcode: "GL1" },
      { name: "Cheltenham", slug: "cheltenham", postcode: "GL50" },
      { name: "Stroud", slug: "stroud", postcode: "GL5" },
      { name: "Cirencester", slug: "cirencester", postcode: "GL7" },
      { name: "Tewkesbury", slug: "tewkesbury", postcode: "GL20" },
    ],
  },
  {
    county: "Shropshire",
    slug: "shropshire",
    towns: [
      { name: "Shrewsbury", slug: "shrewsbury", postcode: "SY1" },
      { name: "Telford", slug: "telford", postcode: "TF1" },
      { name: "Oswestry", slug: "oswestry", postcode: "SY11" },
      { name: "Bridgnorth", slug: "bridgnorth", postcode: "WV15" },
      { name: "Market Drayton", slug: "market-drayton", postcode: "TF9" },
    ],
  },
  {
    county: "Herefordshire",
    slug: "herefordshire",
    towns: [
      { name: "Hereford", slug: "hereford", postcode: "HR1" },
      { name: "Ross-on-Wye", slug: "ross-on-wye", postcode: "HR9" },
      { name: "Ledbury", slug: "ledbury", postcode: "HR8" },
      { name: "Leominster", slug: "leominster", postcode: "HR6" },
      { name: "Bromyard", slug: "bromyard", postcode: "HR7" },
    ],
  },
  {
    county: "Isle of Wight",
    slug: "isle-of-wight",
    towns: [
      { name: "Newport", slug: "newport", postcode: "PO30" },
      { name: "Ryde", slug: "ryde", postcode: "PO33" },
      { name: "Sandown", slug: "sandown", postcode: "PO36" },
      { name: "Cowes", slug: "cowes", postcode: "PO31" },
      { name: "Ventnor", slug: "ventnor", postcode: "PO38" },
    ],
  },
];

export async function GET() {
  const baseUrl = "https://outsourcedbookkeepingservices.co.uk";
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: baseUrl, priority: "1.0", changefreq: "weekly" },
    { url: `${baseUrl}/#about`, priority: "0.7", changefreq: "monthly" },
    { url: `${baseUrl}/#services`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/#pricing`, priority: "0.8", changefreq: "monthly" },
    { url: `${baseUrl}/#contact`, priority: "0.7", changefreq: "monthly" },
    { url: `${baseUrl}/#privacy`, priority: "0.3", changefreq: "yearly" },
    { url: `${baseUrl}/#cookies`, priority: "0.3", changefreq: "yearly" },
  ];

  const countyPages = locationData.map((loc) => ({
    url: `${baseUrl}/#near-me/${loc.slug}`,
    priority: "0.9",
    changefreq: "monthly",
  }));

  const townPages = locationData.flatMap((loc) =>
    loc.towns.map((town) => ({
      url: `${baseUrl}/#near-me/${loc.slug}-${town.slug}`,
      priority: "0.8",
      changefreq: "monthly",
    }))
  );

  const allPages = [...staticPages, ...countyPages, ...townPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
