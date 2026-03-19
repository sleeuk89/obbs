'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Menu,
  X,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Building2,
  Calculator,
  FileText,
  Cloud,
  CreditCard,
  ChevronRight,
  MapPin,
  ArrowRight,
} from 'lucide-react'

// Location Data
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
]

// FAQ Data
const faqData = [
  {
    question: "What is outsourced bookkeeping and how does it work?",
    answer:
      "Outsourced bookkeeping is the process of hiring an external team to manage your financial records remotely. Our team accesses your accounts via cloud accounting software such as Xero, QuickBooks, or FreeAgent, and handles your day-to-day bookkeeping, VAT returns, bank reconciliation, and more — all without you needing to visit an office or manage any paperwork manually.",
  },
  {
    question: "How much does outsourced bookkeeping cost in the UK?",
    answer:
      "Outsourced bookkeeping costs in the UK typically range from £50 to £500 per month, depending on your transaction volume, VAT registration status, and the specific services required. We offer fixed monthly fees with no hidden charges, confirmed before any work begins. All figures are illustrative only.",
  },
  {
    question: "Is outsourced bookkeeping suitable for sole traders?",
    answer:
      "Yes — outsourced bookkeeping is ideal for sole traders. We provide income and expense tracking, Self Assessment preparation support, and Making Tax Digital (MTD for ITSA) compliance, all on a flexible rolling monthly basis with no long-term commitment required.",
  },
  {
    question: "What does Making Tax Digital mean for my bookkeeping?",
    answer:
      "Making Tax Digital (MTD) requires UK businesses to keep digital financial records and submit returns using HMRC-approved MTD-compatible software. MTD for VAT is already mandatory for all VAT-registered businesses. MTD for Income Tax Self-Employed (ITSA) is being phased in from April 2026. Our bookkeeping service is fully MTD-compliant from day one.",
  },
  {
    question: "What accounting software do you use for outsourced bookkeeping?",
    answer:
      "We work with all major UK cloud accounting platforms including Xero, QuickBooks Online, FreeAgent, Sage Business Cloud, and Wave. If you already use one of these, we can connect directly to your existing account. If you need to migrate to a new platform, we handle the full setup and data migration as part of your onboarding.",
  },
  {
    question: "How quickly can you start managing my books?",
    answer:
      "In most cases, we can begin active bookkeeping within 3 to 7 working days of your enquiry. The onboarding process involves providing access to your cloud accounting software, sharing recent bank statements, and completing a brief setup call with our team. There is no disruption to your day-to-day business during the transition.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer:
      "No. We operate on a rolling monthly basis with no long-term contracts required. You can pause, scale, or cancel your service at any time, giving you complete flexibility as your business grows or your needs change.",
  },
  {
    question: "How do you keep my financial data secure?",
    answer:
      "All client data is handled in accordance with UK GDPR and the Data Protection Act 2018. We use encrypted cloud platforms, two-factor authentication, and role-based access controls to ensure your financial records are protected at all times. We never share your data with third parties without your explicit consent.",
  },
  {
    question: "Can you handle payroll as well as bookkeeping?",
    answer:
      "Yes. As part of our bookkeeping service, we offer payroll processing support — including the calculation of employee wages, National Insurance contributions, PAYE submissions to HMRC, and payslip generation. This can be added to any bookkeeping package.",
  },
  {
    question: "What information do I need to provide to get started?",
    answer:
      "To get started, you will need to provide access to your cloud accounting software (or we can set this up for you), your most recent bank statements, details of any outstanding invoices, and copies of recent VAT returns if applicable. Our team will guide you through every step of the onboarding process.",
  },
]

// Testimonials Data
const testimonials = [
  {
    name: "Sarah M.",
    role: "E-commerce Business Owner, Leeds",
    quote:
      "Switching to outsourced bookkeeping was the best decision for my online shop. I used to spend hours every week on spreadsheets — now I just log into Xero and everything is up to date. The fixed monthly fee means no surprises, and I finally have time to focus on growing my business.",
    rating: 5,
  },
  {
    name: "James R.",
    role: "Sole Trader, Birmingham",
    quote:
      "As a self-employed tradesperson, bookkeeping was always the last thing on my mind. The team took care of everything — set up my Xero account, sorted my VAT returns, and helped me get MTD-compliant before the deadline. I wish I had done this years ago.",
    rating: 5,
  },
  {
    name: "Priya K.",
    role: "Director, Limited Company, London",
    quote:
      "We were paying for a part-time bookkeeper who was often unavailable. Now we have a full bookkeeping team at our disposal for a fraction of the cost. The communication is excellent, deadlines are never missed, and our management accounts are delivered on time every month.",
    rating: 5,
  },
]

// Services Data
const services = [
  {
    title: "Bank Reconciliation",
    description:
      "We ensure every transaction in your bank account is accurately recorded and matched against your accounting software. This eliminates discrepancies, prevents errors, and gives you confidence that your financial position is always correct. Our team performs bank reconciliation on a weekly or monthly basis depending on your transaction volume.",
    icon: CreditCard,
  },
  {
    title: "VAT Return Preparation",
    description:
      "We prepare and submit your VAT returns in full compliance with Making Tax Digital requirements. Whether you are on the standard VAT scheme, flat rate scheme, or cash accounting scheme, we ensure your returns are accurate, filed on time, and that you claim every legitimate deduction.",
    icon: FileText,
  },
  {
    title: "Payroll Processing Support",
    description:
      "Our payroll support includes calculating employee wages, National Insurance contributions, and PAYE submissions to HMRC. We generate payslips, handle RTI submissions, and ensure your business remains compliant with all payroll-related obligations throughout the tax year.",
    icon: Users,
  },
  {
    title: "Management Accounts",
    description:
      "We produce monthly or quarterly management accounts including profit and loss statements, balance sheets, and cash flow reports. These reports give you visibility over your business performance and support informed decision-making for growth and investment.",
    icon: TrendingUp,
  },
  {
    title: "Making Tax Digital Compliance",
    description:
      "We ensure your bookkeeping meets all MTD requirements for both VAT and the forthcoming MTD for Income Tax Self-Employed (ITSA). All records are maintained digitally using HMRC-approved software, and we handle the digital submission process on your behalf.",
    icon: Calculator,
  },
  {
    title: "Cloud Accounting Setup",
    description:
      "We set up your cloud accounting software from scratch, including chart of accounts configuration, bank feed connections, and opening balances. If you are migrating from desktop software or spreadsheets, we handle the full data transfer and ensure nothing is lost in transition.",
    icon: Cloud,
  },
]

// Pricing Data
const pricingTiers = [
  {
    name: "Starter",
    price: "From £50",
    period: "/month",
    description: "Ideal for sole traders and micro-businesses with simple bookkeeping needs",
    features: [
      "Up to 50 transactions per month",
      "Monthly bank reconciliation",
      "Annual Self Assessment support",
      "Xero/QuickBooks access included",
      "MTD for VAT compliance",
      "Dedicated bookkeeping contact",
    ],
  },
  {
    name: "Growth",
    price: "From £150",
    period: "/month",
    description: "Perfect for growing SMEs with moderate transaction volumes",
    features: [
      "Up to 200 transactions per month",
      "Weekly bank reconciliation",
      "VAT return preparation",
      "Monthly management accounts",
      "Payroll support (up to 5 employees)",
      "MTD for VAT & ITSA compliance",
      "Priority email support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "From £350",
    period: "/month",
    description: "Comprehensive support for established businesses with complex needs",
    features: [
      "Unlimited transactions",
      "Daily bank reconciliation",
      "VAT return preparation",
      "Full management accounts suite",
      "Payroll support (unlimited employees)",
      "Companies House filing support",
      "Dedicated bookkeeping team",
      "Quarterly strategy calls",
    ],
  },
]

// Trust Badges
const trustBadges = [
  { text: "Fixed Monthly Fees — No Surprises", icon: CreditCard },
  { text: "Free Initial Assessment", icon: CheckCircle2 },
  { text: "MTD-Compliant Bookkeeping", icon: Calculator },
  { text: "100% Remote & Secure", icon: Shield },
  { text: "No Long-Term Contract Required", icon: Clock },
  { text: "Xero & QuickBooks Certified Team", icon: Cloud },
]

// Stats
const stats = [
  { value: "2,500+", label: "Businesses Supported" },
  { value: "£180M+", label: "In Transactions Processed" },
  { value: "99.8%", label: "Filing Accuracy Rate" },
  { value: "200+", label: "5-Star Google Reviews" },
]

// Main Component
export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    businessType: '',
    transactionVolume: '',
    servicesNeeded: [] as string[],
    businessName: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  // Form handlers
  const handleServiceToggle = useCallback((service: string) => {
    setFormData(prev => ({
      ...prev,
      servicesNeeded: prev.servicesNeeded.includes(service)
        ? prev.servicesNeeded.filter(s => s !== service)
        : [...prev.servicesNeeded, service],
    }))
  }, [])

  const handleFormSubmit = useCallback(async () => {
    setFormSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          location: currentPath === '/' ? 'Homepage' : currentPath,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setFormSubmitted(true)
        setFormStep(5)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setFormSubmitting(false)
    }
  }, [formData, currentPath])

  // Initialize
  useEffect(() => {
    setMounted(true)
    const hash = window.location.hash.slice(1) || '/'
    setCurrentPath(hash)
    const cookieConsent = localStorage.getItem('cookieConsent')
    setShowCookieBanner(!cookieConsent)

    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/')
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Get current page info
  const pageInfo = useMemo(() => {
    if (currentPath === '/' || currentPath === 'home') {
      return { type: 'home', title: 'Outsourced Bookkeeping Services UK | Fixed Fee, No Contract', description: 'Professional outsourced bookkeeping services for UK businesses. Fixed monthly fees, MTD-compliant, no long-term contract. Get your free assessment today.' }
    }
    if (currentPath === 'about') {
      return { type: 'about', title: 'About Us | Outsourced Bookkeeping Services UK', description: 'Learn about our experienced UK-based bookkeeping team. Xero certified, QuickBooks ProAdvisor, MTD specialists.' }
    }
    if (currentPath === 'services') {
      return { type: 'services', title: 'Bookkeeping Services UK | VAT Returns, Payroll, MTD Compliance', description: 'Comprehensive bookkeeping services including VAT returns, payroll, management accounts, and MTD compliance.' }
    }
    if (currentPath === 'pricing') {
      return { type: 'pricing', title: 'Bookkeeping Pricing UK | Fixed Monthly Fee Plans', description: 'Transparent fixed-fee bookkeeping pricing for UK businesses. No hidden costs, no long-term contracts.' }
    }
    if (currentPath === 'contact') {
      return { type: 'contact', title: 'Get A Free Bookkeeping Assessment | Contact Us', description: 'Contact us for a free bookkeeping assessment. Our UK-based team will respond within one working day.' }
    }
    if (currentPath === 'privacy') {
      return { type: 'privacy', title: 'Privacy Policy | Outsourced Bookkeeping Services UK', description: 'Privacy policy for Outsourced Bookkeeping Services. How we handle your data in compliance with UK GDPR.' }
    }
    if (currentPath === 'cookies') {
      return { type: 'cookies', title: 'Cookie Policy | Outsourced Bookkeeping Services UK', description: 'Cookie policy explaining how we use cookies on our website in compliance with UK PECR.' }
    }

    // Location pages
    if (currentPath.startsWith('near-me/')) {
      const pathParts = currentPath.replace('near-me/', '').split('-')
      
      // Try to find county
      for (const loc of locationData) {
        if (currentPath === `near-me/${loc.slug}`) {
          return {
            type: 'county',
            title: `Outsourced Bookkeeping Services in ${loc.county} | Remote UK Bookkeeping`,
            description: `Looking for outsourced bookkeeping services in ${loc.county}? Our remote UK bookkeeping team supports businesses of all sizes. Fixed fees, MTD-compliant.`,
            county: loc,
          }
        }
        
        // Try to find town
        for (const town of loc.towns) {
          if (currentPath === `near-me/${loc.slug}-${town.slug}`) {
            return {
              type: 'town',
              title: `Outsourced Bookkeeping Services in ${town.name} ${town.postcode} | Fixed Monthly Fee`,
              description: `Outsourced bookkeeping services in ${town.name} ${town.postcode}. Fully remote, MTD-compliant bookkeeping for sole traders & limited companies.`,
              county: loc,
              town: town,
            }
          }
        }
      }
    }

    return { type: 'home', title: 'Outsourced Bookkeeping Services UK', description: 'Professional outsourced bookkeeping services for UK businesses.' }
  }, [currentPath])

  // Update document title
  useEffect(() => {
    if (mounted) {
      document.title = pageInfo.title
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', pageInfo.description)
      }
    }
  }, [pageInfo, mounted])

  // Cookie consent handler
  const handleCookieConsent = useCallback((consent: string) => {
    localStorage.setItem('cookieConsent', consent)
    setShowCookieBanner(false)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a2744] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-[#f59e0b]" />
              <span className="font-heading font-bold text-lg md:text-xl">OutsourcedBookkeepingServices.co.uk</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#home" className="hover:text-[#f59e0b] transition-colors">Home</a>
              <a href="#services" className="hover:text-[#f59e0b] transition-colors">Services</a>
              <a href="#pricing" className="hover:text-[#f59e0b] transition-colors">Pricing</a>
              <a href="#about" className="hover:text-[#f59e0b] transition-colors">About</a>
              <a href="#near-me/greater-london" className="hover:text-[#f59e0b] transition-colors">Areas Covered</a>
              <a href="#contact" className="hover:text-[#f59e0b] transition-colors">Contact</a>
              <Button onClick={() => setShowFormModal(true)} className="bg-[#f59e0b] hover:bg-[#d97706] text-[#1a2744] font-bold">
                Free Assessment
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-[#1a2744] border-t border-[#2a3b5c] py-4 px-4 space-y-3">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#f59e0b]">Home</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#f59e0b]">Services</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#f59e0b]">Pricing</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#f59e0b]">About</a>
            <a href="#near-me/greater-london" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#f59e0b]">Areas Covered</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#f59e0b]">Contact</a>
            <Button onClick={() => { setShowFormModal(true); setMobileMenuOpen(false) }} className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#1a2744] font-bold mt-2">
              Free Assessment
            </Button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {pageInfo.type === 'home' && <HomePage />}
        {pageInfo.type === 'about' && <AboutPage />}
        {pageInfo.type === 'services' && <ServicesPage />}
        {pageInfo.type === 'pricing' && <PricingPage onOpenForm={() => setShowFormModal(true)} />}
        {pageInfo.type === 'contact' && <ContactPage onOpenForm={() => setShowFormModal(true)} />}
        {pageInfo.type === 'privacy' && <PrivacyPage />}
        {pageInfo.type === 'cookies' && <CookiesPage />}
        {pageInfo.type === 'county' && <CountyPage county={pageInfo.county!} />}
        {pageInfo.type === 'town' && <TownPage county={pageInfo.county!} town={pageInfo.town!} />}
      </main>

      {/* Trust Footer Bar */}
      <div className="bg-[#1a2744] text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm text-center">
            <span>🔒 UK GDPR Compliant</span>
            <span>✓ ICO Registered</span>
            <span>☁️ Xero Certified</span>
            <span>☁️ QuickBooks ProAdvisor</span>
            <span>📋 MTD Compliant</span>
            <span>🇬🇧 UK-Based Team</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a2744] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-8 w-8 text-[#f59e0b]" />
                <span className="font-heading font-bold">OBS UK</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Professional bookkeeping support for UK businesses — fully remote, fully reliable.
              </p>
              <div className="flex gap-2">
                <div className="bg-white rounded p-2 text-xs text-[#1a2744] font-bold">Xero</div>
                <div className="bg-white rounded p-2 text-xs text-[#1a2744] font-bold">QuickBooks</div>
                <div className="bg-white rounded p-2 text-xs text-[#1a2744] font-bold">FreeAgent</div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-[#f59e0b]">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-[#f59e0b] transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-[#f59e0b] transition-colors">Services</a></li>
                <li><a href="#pricing" className="hover:text-[#f59e0b] transition-colors">Pricing</a></li>
                <li><a href="#about" className="hover:text-[#f59e0b] transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-[#f59e0b] transition-colors">Contact</a></li>
                <li><a href="#privacy" className="hover:text-[#f59e0b] transition-colors">Privacy Policy</a></li>
                <li><a href="#cookies" className="hover:text-[#f59e0b] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Areas Covered */}
            <div>
              <h4 className="font-bold mb-4 text-[#f59e0b]">Areas Covered</h4>
              <ul className="space-y-2 text-sm">
                {locationData.slice(0, 8).map(loc => (
                  <li key={loc.slug}>
                    <a href={`#near-me/${loc.slug}`} className="hover:text-[#f59e0b] transition-colors">{loc.county}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4 text-[#f59e0b]">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>Bank Reconciliation</li>
                <li>VAT Return Preparation</li>
                <li>Payroll Processing</li>
                <li>Management Accounts</li>
                <li>MTD Compliance</li>
                <li>Cloud Accounting Setup</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 OutsourcedBookkeepingServices.co.uk | All Rights Reserved</p>
            <p className="mt-2 text-xs">
              All figures, turnaround times, and service examples discussed are provided for illustration purposes only and are not contractually binding.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Button */}
      <button
        onClick={() => setShowFormModal(true)}
        className="fixed bottom-0 left-0 right-0 bg-[#f59e0b] text-[#1a2744] font-bold py-4 text-center z-50 hover:bg-[#d97706] transition-colors lg:hidden"
      >
        Get A Free Assessment
      </button>

      {/* Form Modal */}
      <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#1a2744]">
              {formStep < 5 ? 'Get Your Free Bookkeeping Assessment' : 'Thank You!'}
            </DialogTitle>
          </DialogHeader>

          {formStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">What type of business do you run?</p>
              <div className="grid grid-cols-2 gap-3">
                {['Sole Trader', 'Limited Company', 'Partnership', 'Startup (< 1 year)', 'Charity / Non-Profit', 'Other'].map(type => (
                  <Button
                    key={type}
                    variant={formData.businessType === type ? 'default' : 'outline'}
                    className={formData.businessType === type ? 'bg-[#f59e0b] text-[#1a2744]' : ''}
                    onClick={() => setFormData(prev => ({ ...prev, businessType: type }))}
                  >
                    {type}
                  </Button>
                ))}
              </div>
              <Button
                onClick={() => setFormStep(2)}
                disabled={!formData.businessType}
                className="w-full bg-[#1a2744] hover:bg-[#2a3b5c]"
              >
                Continue
              </Button>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">How many transactions does your business process per month?</p>
              <div className="space-y-2">
                {['Under 50 transactions/month', '50–200 transactions/month', '200–500 transactions/month', '500–1,000 transactions/month', 'Over 1,000 transactions/month'].map(vol => (
                  <Button
                    key={vol}
                    variant={formData.transactionVolume === vol ? 'default' : 'outline'}
                    className={`w-full justify-start ${formData.transactionVolume === vol ? 'bg-[#f59e0b] text-[#1a2744]' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, transactionVolume: vol }))}
                  >
                    {vol}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setFormStep(1)} className="flex-1">Back</Button>
                <Button
                  onClick={() => setFormStep(3)}
                  disabled={!formData.transactionVolume}
                  className="flex-1 bg-[#1a2744] hover:bg-[#2a3b5c]"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">What do you need help with? (Select all that apply)</p>
              <div className="space-y-2">
                {['Day-to-day bookkeeping', 'VAT return preparation', 'Payroll processing support', 'Management accounts', 'Making Tax Digital (MTD) compliance', 'Bank reconciliation', "I'm not sure — please advise"].map(service => (
                  <label key={service} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <Checkbox
                      checked={formData.servicesNeeded.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setFormStep(2)} className="flex-1">Back</Button>
                <Button
                  onClick={() => setFormStep(4)}
                  disabled={formData.servicesNeeded.length === 0}
                  className="flex-1 bg-[#1a2744] hover:bg-[#2a3b5c]"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {formStep === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Your contact details</p>
              <div>
                <Label htmlFor="business-name">Business Name (optional)</Label>
                <Input
                  id="business-name"
                  value={formData.businessName}
                  onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contact-name">Your Name *</Label>
                <Input
                  id="contact-name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">Phone *</Label>
                <Input
                  id="contact-phone"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contact-message">Additional Notes (optional)</Label>
                <Textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setFormStep(3)} className="flex-1">Back</Button>
                <Button
                  onClick={handleFormSubmit}
                  disabled={!formData.name || !formData.phone || !formData.email || formSubmitting}
                  className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-[#1a2744]"
                >
                  {formSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </div>
          )}

          {formStep === 5 && (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold text-[#1a2744]">Thank you, {formData.name}!</h3>
              <p className="text-gray-600">Your free assessment request has been received.</p>
              <p className="text-sm text-gray-500">One of our bookkeeping team will be in touch within one working day.</p>
              <div className="bg-gray-50 p-4 rounded-lg text-left text-sm">
                <p className="font-semibold mb-2">Your Selections:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>Business Type: {formData.businessType}</li>
                  <li>Transaction Volume: {formData.transactionVolume}</li>
                  <li>Services: {formData.servicesNeeded.join(', ')}</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500 italic">Your enquiry is 100% confidential and there is no obligation.</p>
              <Button onClick={() => { setShowFormModal(false); setFormStep(1); setFormData({ businessType: '', transactionVolume: '', servicesNeeded: [], businessName: '', name: '', phone: '', email: '', message: '' }) }} className="bg-[#1a2744] hover:bg-[#2a3b5c]">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-[#1a2744] text-white p-4 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm">
                We use cookies to improve your experience. By continuing to browse, you agree to our use of cookies in accordance with UK GDPR.
                <a href="#cookies" className="text-[#f59e0b] underline ml-1">Learn more</a>
              </p>
              <div className="flex gap-2">
                <Button onClick={() => handleCookieConsent('rejected')} size="sm" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1a2744]">
                  Reject All
                </Button>
                <Button onClick={() => handleCookieConsent('accepted')} size="sm" className="bg-[#f59e0b] hover:bg-[#d97706] text-[#1a2744]">
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Outsourced Bookkeeping Services",
            "url": "https://outsourcedbookkeepingservices.co.uk",
            "logo": "https://outsourcedbookkeepingservices.co.uk/favicon.png",
            "description": "Professional remote bookkeeping services for UK businesses. MTD-compliant, fixed monthly fees, no long-term contract.",
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "200",
              "bestRating": "5"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          })
        }}
      />
    </div>
  )
}

// Hero Form Component
const HeroForm = memo(function HeroForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    phone: '',
    email: '',
    transactionVolume: '',
    message: '',
  })

  const handleSubmit = useCallback(async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill in all required fields')
      return
    }
    setSubmitting(true)
    try {
      const emailMessage = `
NEW BOOKKEEPING ENQUIRY (HERO FORM)
Received: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}

BUSINESS DETAILS:
Business Name: ${formData.businessName || 'Not provided'}
Contact Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

SERVICE DETAILS:
Monthly Transaction Volume: ${formData.transactionVolume || 'Not specified'}

MESSAGE:
${formData.message || 'No additional message provided'}
      `.trim()

      const formspreeData = new URLSearchParams()
      formspreeData.append('name', formData.name)
      formspreeData.append('email', formData.email)
      formspreeData.append('phone', formData.phone)
      formspreeData.append('message', emailMessage)
      formspreeData.append('_subject', `New Enquiry from ${formData.name} — ${formData.businessName || 'Business Not Specified'}`)
      formspreeData.append('_replyto', formData.email)

      const response = await fetch('https://formspree.io/f/maqpvbgk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formspreeData.toString(),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error('Form error:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [formData])

  return (
    <Card className="shadow-2xl border-2 border-[#f59e0b] bg-white">
      <CardHeader className="bg-[#f59e0b] py-3 px-4">
        <CardTitle className="text-base text-[#1a2744] font-bold">Get A Free Assessment</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-bold text-[#1a2744] mb-2">Thank You!</h3>
            <p className="text-sm text-gray-600">Your enquiry has been submitted. We will be in touch within one working day.</p>
          </div>
        ) : (
          <>
            <div>
              <Label htmlFor="hero-business" className="text-xs font-medium">Business Name</Label>
              <Input 
                id="hero-business" 
                placeholder="Your business name" 
                className="mt-1 h-9 text-sm"
                value={formData.businessName}
                onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="hero-name" className="text-xs font-medium">Your Name *</Label>
                <Input 
                  id="hero-name" 
                  placeholder="Full name" 
                  className="mt-1 h-9 text-sm"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="hero-phone" className="text-xs font-medium">Phone *</Label>
                <Input 
                  id="hero-phone" 
                  placeholder="Phone number" 
                  className="mt-1 h-9 text-sm"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="hero-email" className="text-xs font-medium">Email *</Label>
              <Input 
                id="hero-email" 
                type="email" 
                placeholder="Email address" 
                className="mt-1 h-9 text-sm"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="hero-volume" className="text-xs font-medium">Monthly Transactions</Label>
              <Select value={formData.transactionVolume} onValueChange={v => setFormData(prev => ({ ...prev, transactionVolume: v }))}>
                <SelectTrigger id="hero-volume" className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Select volume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50">Under 50</SelectItem>
                  <SelectItem value="50-200">50–200</SelectItem>
                  <SelectItem value="200-500">200–500</SelectItem>
                  <SelectItem value="500-1000">500–1,000</SelectItem>
                  <SelectItem value="over-1000">Over 1,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hero-message" className="text-xs font-medium">Message (optional)</Label>
              <Textarea 
                id="hero-message" 
                placeholder="Tell us about your bookkeeping needs" 
                className="mt-1 text-sm" 
                rows={2}
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
            <Button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="w-full bg-[#1a2744] hover:bg-[#2a3b5c] text-white font-bold h-10"
            >
              {submitting ? 'Submitting...' : 'Request Free Assessment'}
            </Button>
            <p className="text-xs text-center text-gray-500">
              No obligation. We respond within 1 working day.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
})

// Homepage Component
const HomePage = memo(function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a2744] to-[#2a3b5c] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Hero Content */}
            <div className="lg:col-span-3">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Professional <span className="text-[#f59e0b]">Outsourced Bookkeeping Services</span> for UK Businesses
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Fixed monthly fees. No long-term contract. MTD-compliant bookkeeping delivered remotely by a dedicated UK-based team.
              </p>
              <div className="flex flex-wrap gap-4 text-sm mb-8">
                {trustBadges.slice(0, 4).map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <badge.icon className="h-5 w-5 text-[#f59e0b]" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/20">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div className="text-xl md:text-2xl font-bold text-[#f59e0b]">{stat.value}</div>
                    <div className="text-xs text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Form */}
            <div className="lg:col-span-2">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#f59e0b] py-4 hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold text-[#1a2744]">{stat.value}</div>
                <div className="text-sm text-[#1a2744]/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1: Who Can Use */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            Who Can Use Outsourced Bookkeeping Services?
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
            <p>
              <a href="#home" className="text-[#f59e0b] underline font-medium">Outsourced bookkeeping services</a> can be utilised by any UK business that wishes to maintain accurate, up-to-date financial records without the overhead and administrative burden of employing in-house staff. Whether you operate as a sole trader managing your own Self Assessment, a limited company preparing quarterly VAT returns under Making Tax Digital, or a growing partnership seeking better visibility over your cash flow, our team provides the bookkeeping support your business requires — fully remotely and at a fixed monthly fee that is agreed upfront with no hidden charges.
            </p>
            <p>
              Our services are particularly well-suited to small and medium-sized enterprises (SMEs), start-ups, e-commerce businesses, landlords with property portfolios, trades businesses, and professional services firms. Each of these business types shares a common challenge: the need for reliable, compliant financial record-keeping without the cost or complexity of managing an internal bookkeeping function. By choosing outsourced bookkeeping, you gain access to a team of experienced bookkeeping professionals who use cloud-based software such as Xero, QuickBooks Online, and FreeAgent to manage your day-to-day transactions, bank reconciliation, VAT returns, and management accounts.
            </p>
            <p>
              The flexibility of our service model means that we can support businesses at any stage of their journey — from newly registered sole traders who need help setting up their first cloud accounting system, to established limited companies with complex transaction volumes requiring monthly management reporting and Companies House filing support. Our team is also experienced in supporting businesses through the transition to Making Tax Digital (MTD) for both VAT and Income Tax Self-Assessment (ITSA), ensuring your bookkeeping meets all HMRC requirements from day one.
            </p>
          </div>
        </section>

        {/* Section 2: Cost */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            How Much Do Outsourced Bookkeeping Services Cost?
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
            <p>
              The cost of outsourced bookkeeping services in the UK varies depending on several factors, including your monthly transaction volume, whether you are VAT-registered, the complexity of your business structure, and the specific services you require. Typical pricing ranges from £50 to £500 per month for most small and medium-sized businesses, with larger organisations or those with higher transaction volumes potentially requiring bespoke quotes. Our approach is to offer fixed monthly fees that are agreed before any work begins, ensuring you have complete clarity over your bookkeeping costs with no surprise invoices or hidden charges.
            </p>
            <p>
              When comparing the cost of outsourced bookkeeping to hiring an in-house bookkeeper, the savings are substantial. A full-time bookkeeper in the UK typically earns between £25,000 and £35,000 per year, plus employer's National Insurance contributions, pension contributions, holiday pay, sick pay, and other employment costs — bringing the total annual cost to upwards of £32,000. In contrast, many businesses find that their outsourced bookkeeping needs can be met for between £600 and £6,000 per year, depending on their size and requirements. This represents a significant cost saving while also providing access to a broader skill set and eliminating the administrative burden of managing an employee.
            </p>
            <p className="text-sm text-gray-500 italic">
              *All figures, turnaround times, and service examples discussed are provided for illustration purposes only and are not contractually binding.
            </p>
          </div>
        </section>

        {/* Section 3: What Is Included */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            What Is Included In Our Outsourced Bookkeeping Services?
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
            <p>
              Our comprehensive bookkeeping service includes all the day-to-day financial record-keeping tasks your business requires to stay compliant, organised, and informed. This begins with bank reconciliation — the fundamental process of matching every transaction in your bank account to the corresponding entry in your cloud accounting software. Accurate bank reconciliation ensures that your cash position is always correct, discrepancies are identified promptly, and your financial records can be relied upon for decision-making and reporting.
            </p>
            <p>
              Beyond bank reconciliation, our service typically includes sales and purchase ledger management, ensuring that customer invoices are raised promptly, supplier bills are recorded accurately, and aged debtor and creditor reports are available when you need them. For VAT-registered businesses, we prepare and submit your VAT returns in full compliance with Making Tax Digital requirements, using HMRC-approved software to ensure seamless digital submission. We also offer payroll processing support, including calculation of employee wages, National Insurance contributions, and PAYE submissions to HMRC.
            </p>
            <p>
              For businesses requiring deeper insight into their financial performance, we prepare monthly or quarterly management accounts including profit and loss statements, balance sheets, and cash flow summaries. These reports provide the visibility you need to make informed business decisions, identify trends, and plan for growth. All of our services are delivered using cloud accounting platforms such as Xero, QuickBooks Online, and FreeAgent, giving you real-time access to your financial data from anywhere with an internet connection.
            </p>
          </div>
        </section>

        {/* Section 4: Why Choose Outsourced */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            Why Do UK Businesses Choose Outsourced Bookkeeping?
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
            <p>
              UK businesses choose outsourced bookkeeping for a variety of compelling reasons, but cost savings consistently rank among the most significant. By outsourcing your bookkeeping function, you eliminate the direct and indirect costs of employing an in-house bookkeeper — including salary, employer's National Insurance, pension contributions, holiday pay, sick pay, training costs, and office space. For most small and medium-sized businesses, the annual cost of outsourced bookkeeping represents a fraction of the total employment cost of a full-time bookkeeper, freeing up resources that can be invested elsewhere in the business.
            </p>
            <p>
              Scalability is another key advantage. As your business grows and your transaction volume increases, your outsourced bookkeeping service can scale with you — without the need to recruit, train, and manage additional staff. Conversely, if your business experiences a quieter period, you can scale your service down accordingly. This flexibility is difficult to achieve with an in-house function, where staffing decisions are often constrained by employment contracts, notice periods, and recruitment lead times.
            </p>
            <p>
              Access to expertise is also a major factor. When you choose outsourced bookkeeping, you gain access to a team of professionals with broad experience across multiple industries and software platforms. This depth of knowledge is difficult to replicate with a single in-house bookkeeper, whose experience may be limited to a specific sector or software. Our team includes Xero-certified advisors and QuickBooks ProAdvisors who stay up to date with the latest software features, HMRC guidance, and regulatory changes — ensuring your bookkeeping remains accurate and compliant at all times.
            </p>
          </div>
        </section>

        {/* Section 5: How to Switch */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            How Do I Switch To Outsourced Bookkeeping?
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
            <p>
              Switching to outsourced bookkeeping is a straightforward process that typically takes between 3 and 7 working days from your initial enquiry to active bookkeeping. The first step is to request a free assessment, during which we discuss your business, your current bookkeeping arrangements, and your specific requirements. This conversation helps us understand your needs and provide an accurate fixed-fee quote before any work begins.
            </p>
            <p>
              Once you decide to proceed, the onboarding process involves providing access to your cloud accounting software (or we can set up a new system for you if you do not currently use one), sharing your most recent bank statements, details of any outstanding invoices, and copies of recent VAT returns if applicable. We conduct a review of your existing records to identify any gaps or issues that need to be addressed, and provide a clear plan for bringing everything up to date.
            </p>
            <p>
              Data migration is handled carefully and securely. If you are moving from desktop software or spreadsheets to a cloud-based platform, we extract your historical data and import it into your new system, ensuring continuity of records and no loss of information. Throughout the transition, there is no disruption to your day-to-day business operations — your <a href="#home" className="text-[#f59e0b] underline font-medium">bookkeeping support</a> team works remotely and asynchronously, requiring minimal input from you once the initial setup is complete.
            </p>
          </div>
        </section>

        {/* Section 6: Software */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            What Accounting Software Do You Work With?
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
            <p>
              We work with all major UK cloud accounting platforms, including Xero, QuickBooks Online, FreeAgent, Sage Business Cloud, and Wave. Each of these platforms is Making Tax Digital (MTD) compatible, ensuring your bookkeeping meets HMRC requirements for digital record-keeping and submission. If you already use one of these platforms, we can connect directly to your existing account with no need to change software or learn a new system.
            </p>
            <p>
              If you do not currently use cloud accounting software, we can recommend and set up the most appropriate platform for your business based on your size, industry, and specific requirements. We handle the full setup process, including configuring your chart of accounts, connecting bank feeds, importing historical data, and providing training on how to access and interpret your financial reports. Our team holds Xero Advisor Certification and QuickBooks ProAdvisor status, demonstrating our expertise in these leading platforms.
            </p>
            <p>
              For businesses using other software such as Dext (formerly Receipt Bank), AutoEntry, or Hubdoc for expense capture, we can integrate these tools into your bookkeeping workflow, ensuring that receipts, invoices, and other documents are captured, categorised, and reconciled efficiently. Our goal is to create a seamless, automated bookkeeping process that minimises manual data entry and maximises accuracy and visibility.
            </p>
          </div>
        </section>

        {/* Section 7: MTD */}
        <section className="mb-12 bg-[#f9fafb] p-6 rounded-lg border-l-4 border-[#f59e0b]">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            How Does Making Tax Digital Affect My Bookkeeping?
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
            <p>
              Making Tax Digital (MTD) is a fundamental change to how UK businesses manage and report their taxes to HMRC. Under MTD, businesses are required to keep digital financial records using HMRC-approved software and submit returns electronically through an API connection. MTD for VAT is already mandatory for all VAT-registered businesses, meaning that if you are registered for VAT, you must use MTD-compatible software to file your returns. MTD for Income Tax Self-Employed (ITSA) is being phased in from April 2026, with self-employed individuals and landlords with qualifying income required to follow the new digital reporting rules.
            </p>
            <p>
              For businesses that have traditionally kept their records in spreadsheets or on paper, MTD represents a significant shift. However, for businesses already using cloud accounting software such as Xero or QuickBooks, the transition is relatively straightforward. Our <a href="#home" className="text-[#f59e0b] underline font-medium">outsourced bookkeeping services</a> are fully MTD-compliant from day one, ensuring that your digital records meet all HMRC requirements and that your returns are submitted correctly through the appropriate digital channels.
            </p>
            <p>
              We stay up to date with all MTD developments, including changes to the implementation timeline and new requirements as they are announced. Our team can help you understand what MTD means for your specific circumstances, prepare your systems for compliance, and ensure that you are ready well in advance of any deadlines. We also monitor HMRC guidance and communicate any relevant changes to our clients, providing peace of mind that your bookkeeping remains compliant in an evolving regulatory environment.
            </p>
          </div>
        </section>

        {/* Section 8: Signs You Need Outsourced */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            What Are The Signs Your Business Needs Outsourced Bookkeeping?
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
            <p>
              Many businesses reach a point where DIY bookkeeping or an outdated approach to financial record-keeping is no longer sustainable. Common signs that it may be time to consider outsourced bookkeeping include consistently falling behind on your records, missing VAT or tax deadlines, lacking visibility over your cash flow, and spending too much time on administrative tasks that take you away from running your business. If you find yourself scrambling to locate invoices, receipts, or bank statements when your year-end approaches, this is a clear indication that your current bookkeeping process needs attention.
            </p>
            <p>
              Other warning signs include receiving penalties or warnings from HMRC for late or incorrect submissions, experiencing cash flow difficulties because you do not have an accurate picture of your income and expenses, and feeling overwhelmed by the complexity of Making Tax Digital requirements. For growing businesses, the point at which transaction volumes exceed what can be comfortably managed in a spreadsheet is often the trigger for seeking professional bookkeeping support.
            </p>
            <p>
              Even if your current bookkeeping is manageable, you may choose to outsource simply to free up your time and mental energy for more valuable activities. Many business owners find that outsourcing their bookkeeping allows them to focus on sales, customer service, and strategic growth, knowing that their financial records are being managed accurately and compliantly by a dedicated team. If you are unsure whether outsourced bookkeeping is right for your business, a free assessment can help you understand the potential benefits and costs.
            </p>
          </div>
        </section>

        {/* Section 9: Outsourced vs In-House */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            Outsourced Bookkeeping vs. Hiring In-House: Which Is Better?
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4 mb-6">
            <p>
              The decision between outsourced bookkeeping and hiring an in-house bookkeeper depends on your specific circumstances, but for most small and medium-sized UK businesses, outsourcing offers compelling advantages in terms of cost, flexibility, and access to expertise. The table below summarises the key differences between the two approaches:
            </p>
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-[#e5e7eb] text-sm">
              <thead>
                <tr className="bg-[#1a2744] text-white">
                  <th className="p-3 text-left">Factor</th>
                  <th className="p-3 text-left">Outsourced Bookkeeping</th>
                  <th className="p-3 text-left">In-House Bookkeeper</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border border-[#e5e7eb]">Annual Cost</td><td className="p-3 border border-[#e5e7eb]">From £600–£6,000/yr</td><td className="p-3 border border-[#e5e7eb]">£27,000–£40,000/yr (salary + NI + pension)</td></tr>
                <tr className="bg-[#f9fafb]"><td className="p-3 border border-[#e5e7eb]">Contract</td><td className="p-3 border border-[#e5e7eb]">Rolling monthly — cancel anytime</td><td className="p-3 border border-[#e5e7eb]">Employment contract (notice period applies)</td></tr>
                <tr><td className="p-3 border border-[#e5e7eb]">Software</td><td className="p-3 border border-[#e5e7eb]">Included (Xero, QuickBooks, etc.)</td><td className="p-3 border border-[#e5e7eb]">Additional software licence costs</td></tr>
                <tr className="bg-[#f9fafb]"><td className="p-3 border border-[#e5e7eb]">MTD Compliance</td><td className="p-3 border border-[#e5e7eb]">Built-in from day one</td><td className="p-3 border border-[#e5e7eb]">Depends on individual knowledge</td></tr>
                <tr><td className="p-3 border border-[#e5e7eb]">Scalability</td><td className="p-3 border border-[#e5e7eb]">Scale up/down instantly</td><td className="p-3 border border-[#e5e7eb]">Requires recruitment for growth</td></tr>
                <tr className="bg-[#f9fafb]"><td className="p-3 border border-[#e5e7eb]">Sick/Holiday Cover</td><td className="p-3 border border-[#e5e7eb]">Team always available</td><td className="p-3 border border-[#e5e7eb]">Business disruption risk</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic">
            *Cost figures are illustrative only. Actual costs vary by business size and requirements.
          </p>
        </section>

        {/* Section 10: Flexible Service */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            No Fixed Contract — How Our Flexible Service Works
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4">
            <p>
              We believe that trust and results should be what keeps you with us — not a lock-in contract. That is why we operate on a rolling monthly basis with no long-term commitment required. You can start, pause, scale up, scale down, or cancel your service at any time, giving you complete flexibility as your business evolves. This approach puts you in control and ensures that our service remains competitive and responsive to your needs.
            </p>
            <p>
              Our flexible service model means that you are never paying for more than you need. If your business experiences seasonal fluctuations, you can adjust your service level accordingly. If you are planning a period of rapid growth, we can scale up to support increased transaction volumes. And if your circumstances change and you no longer require outsourced bookkeeping, you are free to move on with no penalty or notice period. We earn your business every month through the quality and reliability of our work.
            </p>
            <p>
              Transparency is central to how we operate. Your fixed monthly fee is agreed before any work begins, and there are no hidden charges, surprise invoices, or unexpected costs. We communicate clearly about what is included, what might incur an additional charge (such as catching up on historical bookkeeping or complex payroll setups), and we always seek your approval before proceeding. This straightforward, honest approach has earned us the trust of over 2,500 UK businesses.
            </p>
          </div>
        </section>

        {/* Section 11: Why Choose Us */}
        <section className="mb-12 bg-[#1a2744] text-white p-8 rounded-lg">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
            Why Choose Us For Your Outsourced Bookkeeping?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-200 space-y-4">
            <p>
              We are a UK-based team with extensive experience supporting businesses of all sizes with their bookkeeping needs. Our team includes Xero Advisor Certified professionals and QuickBooks ProAdvisors who stay current with the latest software developments, HMRC guidance, and regulatory changes. We have been early adopters of Making Tax Digital workflows and have helped hundreds of businesses transition smoothly to the new digital reporting requirements.
            </p>
            <p>
              Security and confidentiality are paramount. All client data is handled in accordance with UK GDPR and the Data Protection Act 2018. We use encrypted cloud platforms, two-factor authentication, and role-based access controls to ensure your financial records are protected at all times. We never share your data with third parties without your explicit consent, and you retain full ownership and access to your data throughout our engagement.
            </p>
            <p>
              Our fixed-fee model, no-contract approach, and commitment to responsive communication set us apart from traditional bookkeeping providers. You will have a dedicated contact who knows your business and is available to answer questions, provide guidance, and ensure your bookkeeping runs smoothly. With over 2,500 businesses supported, £180 million in transactions processed, and a 99.8% filing accuracy rate, we have the experience and track record to deliver reliable, professional <a href="#home" className="text-[#f59e0b] underline font-medium">bookkeeping support</a> for your business.
            </p>
          </div>
        </section>

        {/* Section 12: Areas We Cover */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            Areas We Cover Across The UK
          </h2>
          <div className="prose prose-lg max-w-none text-[#374151] space-y-4 mb-6">
            <p>
              Our <a href="#home" className="text-[#f59e0b] underline font-medium">outsourced bookkeeping services</a> are delivered remotely, meaning we can support businesses anywhere in the United Kingdom. There is no need to visit an office or hand over physical paperwork — everything is managed digitally and securely via cloud accounting software. Whether you are based in a major city, a market town, or a rural area, you receive the same high standard of service and the same dedicated support from our UK-based team.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locationData.map(loc => (
              <a
                key={loc.slug}
                href={`#near-me/${loc.slug}`}
                className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb] hover:border-[#f59e0b] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#f59e0b]" />
                  <span className="font-medium text-[#1a2744] group-hover:text-[#f59e0b]">{loc.county}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium text-[#1a2744]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#374151]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="border-2 border-[#e5e7eb]">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-[#374151] mb-4 text-sm italic">"{testimonial.quote}"</p>
                  <p className="font-bold text-[#1a2744]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Last Updated */}
        <p className="text-xs text-gray-500 text-center mt-8">
          Last reviewed: January 2025 — All information is reviewed quarterly to ensure accuracy.
        </p>
      </div>
    </div>
  )
})

// About Page Component
const AboutPage = memo(function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a2744] mb-8">About Us</h1>
      
      {/* Experience Section */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold text-[#1a2744] mb-4">Our Experience</h2>
        <p className="text-[#374151] mb-4">
          Our team has supported UK businesses with bookkeeping for over a decade, building deep expertise in cloud accounting, Making Tax Digital compliance, and the specific challenges faced by sole traders, limited companies, and SMEs. We have assisted over 2,500 UK businesses with their financial record-keeping, processing more than £180 million in transactions annually.
        </p>
        <p className="text-[#374151]">
          We have worked across a wide range of industry sectors including e-commerce, construction and trades, professional services, hospitality, retail, property and landlord portfolios, healthcare, and creative industries. This breadth of experience means we understand the unique bookkeeping challenges faced by different business types and can provide tailored support accordingly.
        </p>
      </section>

      {/* Expertise Section */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold text-[#1a2744] mb-4">Our Expertise</h2>
        <p className="text-[#374151] mb-4">
          Our team holds Xero Advisor Certification and QuickBooks ProAdvisor status, demonstrating our proficiency in the leading cloud accounting platforms used by UK businesses. We were early adopters of Making Tax Digital-compatible workflows and have helped hundreds of businesses transition to the new digital record-keeping and submission requirements.
        </p>
        <p className="text-[#374151] mb-4">
          Our bookkeeping team includes professionals with backgrounds in financial administration, cloud accounting implementation, and UK tax compliance. We undertake continuous professional development to stay current with HMRC guidance, software updates, and regulatory changes.
        </p>
        <div className="flex gap-4 my-6">
          <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb] text-center">
            <Cloud className="h-8 w-8 text-[#f59e0b] mx-auto mb-2" />
            <p className="font-bold text-[#1a2744]">Xero Certified</p>
          </div>
          <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb] text-center">
            <Calculator className="h-8 w-8 text-[#f59e0b] mx-auto mb-2" />
            <p className="font-bold text-[#1a2744]">QuickBooks ProAdvisor</p>
          </div>
          <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb] text-center">
            <FileText className="h-8 w-8 text-[#f59e0b] mx-auto mb-2" />
            <p className="font-bold text-[#1a2744]">MTD Compliant</p>
          </div>
        </div>
      </section>

      {/* Authoritativeness Section */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold text-[#1a2744] mb-4">Regulatory & Industry Bodies</h2>
        <p className="text-[#374151] mb-4">
          We maintain awareness of and alignment with guidance from key regulatory bodies including HMRC, Companies House, the Institute of Certified Bookkeepers (ICB), and the Association of Accounting Technicians (AAT). Our workflows are designed to ensure compliance with all relevant filing deadlines and regulatory requirements.
        </p>
        <p className="text-[#374151]">
          For authoritative guidance on UK tax matters, we direct clients to official sources including{' '}
          <a href="https://www.gov.uk/guidance/making-tax-digital-for-vat" target="_blank" rel="noopener noreferrer" className="text-[#f59e0b] underline">HMRC's Making Tax Digital guidance</a>,{' '}
          <a href="https://www.gov.uk/file-your-confirmation-statement-annual-return" target="_blank" rel="noopener noreferrer" className="text-[#f59e0b] underline">Companies House filing requirements</a>, and{' '}
          <a href="https://www.gov.uk/self-assessment-tax-returns" target="_blank" rel="noopener noreferrer" className="text-[#f59e0b] underline">Self Assessment guidance on GOV.UK</a>.
        </p>
      </section>

      {/* Trustworthiness Section */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold text-[#1a2744] mb-4">Trust & Security</h2>
        <p className="text-[#374151] mb-4">
          All client data is handled in accordance with UK GDPR and the Data Protection Act 2018. We are registered with the Information Commissioner's Office (ICO). We use encrypted cloud platforms, two-factor authentication, and role-based access controls to ensure your financial records are protected at all times.
        </p>
        <p className="text-[#374151]">
          We offer a free initial assessment with no obligation, transparent fixed-fee pricing with no hidden costs, and a no-contract service model that allows you to cancel at any time. Your privacy and data security are fundamental to how we operate. For full details, please see our <a href="#privacy" className="text-[#f59e0b] underline">Privacy Policy</a>.
        </p>
      </section>

      <p className="text-xs text-gray-500 text-center mt-8">
        Last reviewed: January 2025. All information is reviewed quarterly to ensure accuracy.
      </p>
    </div>
  )
})

// Services Page Component
const ServicesPage = memo(function ServicesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a2744] mb-8">Our Bookkeeping Services</h1>
      
      <p className="text-[#374151] mb-8">
        We provide comprehensive <a href="#home" className="text-[#f59e0b] underline font-medium">outsourced bookkeeping services</a> for UK businesses of all sizes. All services are delivered remotely using cloud accounting software and are fully compliant with Making Tax Digital requirements.
      </p>

      <div className="space-y-8">
        {services.map((service, i) => (
          <Card key={i} className="border-l-4 border-l-[#f59e0b]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <service.icon className="h-6 w-6 text-[#f59e0b]" />
                <h2 className="font-heading text-xl font-bold text-[#1a2744]">{service.title}</h2>
              </div>
              <p className="text-[#374151]">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
        <h3 className="font-bold text-[#1a2744] mb-3">Ready to get started?</h3>
        <p className="text-[#374151] mb-4">Contact us for a free bookkeeping assessment. We'll discuss your needs and provide a fixed-fee quote with no obligation.</p>
        <Button className="bg-[#f59e0b] hover:bg-[#d97706] text-[#1a2744] font-bold">
          <a href="#contact">Get A Free Assessment</a>
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-8">
        All figures, turnaround times, and service examples discussed are provided for illustration purposes only.
      </p>
    </div>
  )
})

// Pricing Page Component
const PricingPage = memo(function PricingPage({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">Bookkeeping Pricing</h1>
      <p className="text-[#374151] mb-8">
        Transparent, fixed monthly fees with no hidden costs. Choose the plan that fits your business size and transaction volume. All plans include access to cloud accounting software and a dedicated bookkeeping contact.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {pricingTiers.map((tier, i) => (
          <Card key={i} className={`relative ${tier.popular ? 'border-2 border-[#f59e0b] shadow-lg' : ''}`}>
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#f59e0b] text-[#1a2744] px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl text-[#1a2744]">{tier.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold text-[#1a2744]">{tier.price}</span>
                <span className="text-gray-500">{tier.period}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{tier.description}</p>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <ul className="space-y-2">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#10b981] mt-0.5 flex-shrink-0" />
                    <span className="text-[#374151]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={onOpenForm}
                className={`w-full mt-6 ${tier.popular ? 'bg-[#f59e0b] hover:bg-[#d97706] text-[#1a2744]' : 'bg-[#1a2744] hover:bg-[#2a3b5c]'}`}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-[#f9fafb] p-6 rounded-lg border border-[#e5e7eb]">
        <h3 className="font-bold text-[#1a2744] mb-2">Need a tailored quote?</h3>
        <p className="text-[#374151] mb-4">If your business has specific requirements not covered by our standard plans, contact us for a bespoke quote. We work with businesses of all sizes and can create a custom package to match your needs.</p>
        <Button 
          onClick={onOpenForm}
          variant="outline" 
          className="border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#1a2744]"
        >
          Contact Us
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-8">
        *All figures, turnaround times, and service examples discussed are provided for illustration purposes only and are not contractually binding. Actual fees are confirmed before any work begins.
      </p>
    </div>
  )
})

// Contact Page Component
const ContactPage = memo(function ContactPage({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a2744] mb-8">Get A Free Bookkeeping Assessment</h1>
      
      <p className="text-[#374151] mb-8">
        Ready to take control of your bookkeeping? Contact us for a free, no-obligation assessment. Our UK-based team will review your needs and provide a fixed-fee quote within one working day.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-4">Why Choose Us?</h2>
          <ul className="space-y-3">
            {trustBadges.map((badge, i) => (
              <li key={i} className="flex items-center gap-3">
                <badge.icon className="h-5 w-5 text-[#f59e0b]" />
                <span className="text-[#374151]">{badge.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-4">What Happens Next?</h2>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="bg-[#f59e0b] text-[#1a2744] w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <span className="text-[#374151]">Complete the enquiry form</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#f59e0b] text-[#1a2744] w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <span className="text-[#374151]">We'll contact you within 1 working day</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#f59e0b] text-[#1a2744] w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <span className="text-[#374151]">Receive your fixed-fee quote</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#f59e0b] text-[#1a2744] w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <span className="text-[#374151]">Onboarding begins within 3–7 days</span>
            </li>
          </ol>
        </div>
      </div>

      <Button onClick={onOpenForm} size="lg" className="mt-8 bg-[#f59e0b] hover:bg-[#d97706] text-[#1a2744] font-bold">
        Start Your Free Assessment
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  )
})

// Privacy Page Component
const PrivacyPage = memo(function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a2744] mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

      <div className="prose prose-lg max-w-none text-[#374151] space-y-6">
        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">Data Controller</h2>
          <p>
            The data controller for this website is Outsourced Bookkeeping Services. You can contact us via our <a href="#contact" className="text-[#f59e0b] underline">contact form</a>. We are committed to protecting your personal data and your privacy rights in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">What Data We Collect</h2>
          <p>
            We collect personal data when you use our contact form, including: your name, email address, phone number, business name, and any additional information you choose to provide in your message. We also collect technical data such as your IP address and browser type when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">Legal Basis for Processing</h2>
          <p>
            We process your personal data on the basis of legitimate interest (to respond to your enquiry and provide our services) and, where applicable, contract (to fulfil our service agreement with you). We do not rely on consent as our primary legal basis for processing.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">How We Use Your Data</h2>
          <p>
            We use your personal data to: respond to enquiries about our services; provide bookkeeping services to clients; communicate with you about our services; comply with legal and regulatory obligations; and improve our website and services.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">Third-Party Processors</h2>
          <p>
            We use the following third-party services to process data: Formspree (form submission handling, https://formspree.io); our cloud accounting platforms (Xero, QuickBooks, FreeAgent) for client bookkeeping data. We do not sell or share your personal data with any other third parties.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">Your Rights</h2>
          <p>
            Under UK GDPR, you have the right to: access your personal data; rectify inaccurate data; erase your data; restrict processing; data portability; and object to processing. To exercise any of these rights, please <a href="#contact" className="text-[#f59e0b] underline">contact us</a>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">Complaints</h2>
          <p>
            You have the right to lodge a complaint with the Information Commissioner's Office (ICO) if you believe your data protection rights have been infringed. Visit <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#f59e0b] underline">ico.org.uk</a> for more information.
          </p>
        </section>
      </div>
    </div>
  )
})

// Cookies Page Component
const CookiesPage = memo(function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a2744] mb-8">Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

      <div className="prose prose-lg max-w-none text-[#374151] space-y-6">
        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. This policy explains how we use cookies on our website in compliance with the UK Privacy and Electronic Communications Regulations (PECR).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-[#1a2744]">Essential Cookies</h3>
              <p>These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#1a2744]">Analytics Cookies</h3>
              <p>We use Google Analytics 4 to understand how visitors interact with our website. These cookies collect information anonymously, including the number of visitors, where visitors come from, and the pages they visit. We only load analytics cookies after you have given your consent.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">Your Cookie Choices</h2>
          <p>
            When you first visit our website, you will see a cookie consent banner allowing you to accept or reject non-essential cookies. You can also manage your cookie preferences at any time through your browser settings. Most browsers allow you to block or delete cookies, though this may affect the functionality of some websites.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">How to Manage Cookies</h2>
          <p>
            You can control cookies through your browser settings. For more information on how to do this, visit the help pages of your browser. Please note that blocking all cookies may impact your experience on our website and others.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-[#1a2744] mb-3">Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please <a href="#contact" className="text-[#f59e0b] underline">contact us</a>.
          </p>
        </section>
      </div>
    </div>
  )
})

// County Page Component
const CountyPage = memo(function CountyPage({ county }: { county: typeof locationData[0] }) {
  const nearbyCounties = useMemo(() => {
    const currentIndex = locationData.findIndex(l => l.slug === county.slug)
    const nearby: typeof locationData = []
    if (currentIndex > 0) nearby.push(locationData[currentIndex - 1])
    if (currentIndex < locationData.length - 1) nearby.push(locationData[currentIndex + 1])
    return nearby.slice(0, 3)
  }, [county.slug])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center gap-2">
          <li><a href="#home" className="text-[#f59e0b] hover:underline">Home</a></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li><a href="#near-me/greater-london" className="text-[#f59e0b] hover:underline">Areas Covered</a></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="text-[#374151]">{county.county}</li>
        </ol>
      </nav>

      {/* Key Takeaways */}
      <div className="bg-[#f9fafb] border-l-4 border-[#f59e0b] p-6 mb-8 rounded-r-lg">
        <h3 className="font-bold text-[#1a2744] mb-3">Key Takeaways — Outsourced Bookkeeping in {county.county}</h3>
        <ul className="space-y-2 text-[#374151]">
          <li>✓ Fully remote bookkeeping — no office visit required</li>
          <li>✓ MTD-compliant record-keeping for VAT and Income Tax</li>
          <li>✓ Fixed monthly fee — no surprise invoices</li>
          <li>✓ Onboarding within 3–7 working days</li>
          <li>✓ No long-term contract required</li>
        </ul>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a2744] mb-6">
        Outsourced Bookkeeping Services in {county.county}
      </h1>

      <div className="prose prose-lg max-w-none text-[#374151] space-y-6">
        <p>
          <a href="#home" className="text-[#f59e0b] underline font-medium">Outsourced bookkeeping services</a> for businesses in {county.county} provide a professional, cost-effective alternative to managing financial records in-house. Our remote UK-based team supports sole traders, limited companies, partnerships, and SMEs throughout {county.county}, delivering accurate, MTD-compliant bookkeeping via cloud accounting platforms such as Xero, QuickBooks, and FreeAgent.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">Who Is This Service For?</h2>
        <p>
          Our <a href={`#near-me/${county.slug}`} className="text-[#f59e0b] underline font-medium">bookkeeping services in {county.county}</a> are designed for any business that requires reliable financial record-keeping without the overhead of employing in-house staff. Whether you are a sole trader in one of {county.county}'s market towns, a limited company in the county's commercial centres, or an e-commerce business operating from anywhere in the region, we provide the bookkeeping support you need to stay compliant, organised, and informed.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">How Much Does It Cost?</h2>
        <p>
          Pricing for outsourced bookkeeping in {county.county} follows our national fixed-fee model, with monthly costs typically ranging from £50 to £500 depending on transaction volume and the services required. We provide a clear, fixed quote before any work begins — no hidden charges, no surprise invoices. <a href="#pricing" className="text-[#f59e0b] underline font-medium">View our pricing plans</a> for more details.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">What Services Are Included?</h2>
        <p>
          Our comprehensive bookkeeping service includes bank reconciliation, sales and purchase ledger management, VAT return preparation and submission, payroll support, management accounts, and Making Tax Digital compliance. All services are delivered remotely using cloud accounting software, giving you real-time access to your financial data from anywhere in {county.county} or beyond. <a href="#services" className="text-[#f59e0b] underline font-medium">Learn more about our services</a>.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">Making Tax Digital Compliance</h2>
        <p>
          All VAT-registered businesses in {county.county} are required to comply with Making Tax Digital for VAT, maintaining digital records and submitting returns using HMRC-approved software. Our team ensures your bookkeeping meets these requirements from day one, and we are prepared to support your transition to MTD for Income Tax Self-Employed (ITSA) when it is phased in from April 2026.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">How to Get Started</h2>
        <p>
          Getting started with outsourced bookkeeping in {county.county} is straightforward. Contact us for a free assessment, and we will provide a fixed-fee quote within one working day. Onboarding typically takes 3 to 7 working days, during which we set up or connect to your cloud accounting software, review your existing records, and begin managing your bookkeeping remotely.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">Towns We Cover in {county.county}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
          {county.towns.map(town => (
            <a
              key={town.slug}
              href={`#near-me/${county.slug}-${town.slug}`}
              className="p-3 bg-[#f9fafb] rounded border border-[#e5e7eb] hover:border-[#f59e0b] text-sm"
            >
              {town.name} ({town.postcode})
            </a>
          ))}
        </div>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">Nearby Areas</h2>
        <div className="flex flex-wrap gap-3 my-4">
          {nearbyCounties.map(loc => (
            <a
              key={loc.slug}
              href={`#near-me/${loc.slug}`}
              className="px-4 py-2 bg-[#1a2744] text-white rounded hover:bg-[#2a3b5c] text-sm"
            >
              {loc.county}
            </a>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center mt-8">
        All figures, turnaround times, and service examples discussed are provided for illustration purposes only and are not contractually binding.
      </p>
    </div>
  )
})

// Town Page Component
const TownPage = memo(function TownPage({ county, town }: { county: typeof locationData[0]; town: typeof county.towns[0] }) {
  const nearbyTowns = useMemo(() => {
    return county.towns.filter(t => t.slug !== town.slug).slice(0, 3)
  }, [county.towns, town.slug])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center gap-2">
          <li><a href="#home" className="text-[#f59e0b] hover:underline">Home</a></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li><a href="#near-me/greater-london" className="text-[#f59e0b] hover:underline">Areas Covered</a></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li><a href={`#near-me/${county.slug}`} className="text-[#f59e0b] hover:underline">{county.county}</a></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="text-[#374151]">{town.name}</li>
        </ol>
      </nav>

      {/* Key Takeaways */}
      <div className="bg-[#f9fafb] border-l-4 border-[#f59e0b] p-6 mb-8 rounded-r-lg">
        <h3 className="font-bold text-[#1a2744] mb-3">Key Takeaways — Outsourced Bookkeeping in {town.name}</h3>
        <ul className="space-y-2 text-[#374151]">
          <li>✓ Fully remote bookkeeping — no office visit required</li>
          <li>✓ MTD-compliant record-keeping for VAT and Income Tax</li>
          <li>✓ Fixed monthly fee — no surprise invoices</li>
          <li>✓ Onboarding within 3–7 working days</li>
          <li>✓ No long-term contract required</li>
        </ul>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1a2744] mb-6">
        Outsourced Bookkeeping Services in {town.name} {town.postcode}
      </h1>

      <div className="prose prose-lg max-w-none text-[#374151] space-y-6">
        <p>
          <a href="#home" className="text-[#f59e0b] underline font-medium">Outsourced bookkeeping services</a> for businesses in {town.name}, {town.postcode}, provide professional financial record-keeping delivered remotely by our UK-based team. Whether you are a sole trader, limited company, partnership, or SME operating in {town.name}, we offer MTD-compliant bookkeeping via cloud accounting software with fixed monthly fees and no long-term contract.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">Who Is This Service For in {town.name}?</h2>
        <p>
          Our <a href={`#near-me/${county.slug}-${town.slug}`} className="text-[#f59e0b] underline font-medium">bookkeeping services in {town.name}</a> support businesses of all types and sizes throughout the {town.postcode} area. From retail and hospitality to professional services and trades, we provide the bookkeeping expertise you need without the cost and complexity of hiring in-house. Our clients across <a href={`#near-me/${county.slug}`} className="text-[#f59e0b] underline font-medium">{county.county}</a> appreciate the flexibility of our service — scale up or down as your business changes, with no lock-in contract.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">Pricing for {town.name} Businesses</h2>
        <p>
          Pricing for outsourced bookkeeping in {town.name} follows our transparent fixed-fee model. Monthly costs typically range from £50 to £500 depending on your transaction volume and the specific services you require. We provide a written quote before any work begins, so you know exactly what to expect. <a href="#pricing" className="text-[#f59e0b] underline font-medium">View our pricing plans</a> for more information.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">MTD Compliance for {town.name} Businesses</h2>
        <p>
          If your business in {town.name} is VAT-registered, you are already required to comply with Making Tax Digital for VAT. This means keeping digital records and submitting VAT returns using HMRC-approved software. Our bookkeeping service is fully MTD-compliant, ensuring your records meet all requirements. With MTD for Income Tax Self-Employed (ITSA) being phased in from April 2026, now is the time to ensure your bookkeeping systems are ready.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">How to Get Started</h2>
        <p>
          Getting started with outsourced bookkeeping in {town.name} is simple. Request a free assessment through our contact form, and we will provide a fixed-fee quote within one working day. Onboarding typically takes 3 to 7 working days. There is no need to visit an office — everything is handled remotely via cloud accounting software. <a href="#contact" className="text-[#f59e0b] underline font-medium">Contact us today</a> to begin.
        </p>

        <h2 className="font-heading text-2xl font-bold text-[#1a2744]">Nearby Areas We Cover</h2>
        <div className="flex flex-wrap gap-3 my-4">
          {nearbyTowns.map(t => (
            <a
              key={t.slug}
              href={`#near-me/${county.slug}-${t.slug}`}
              className="px-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded hover:border-[#f59e0b] text-sm"
            >
              {t.name}
            </a>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center mt-8">
        All figures, turnaround times, and service examples discussed are provided for illustration purposes only and are not contractually binding.
      </p>
    </div>
  )
})
