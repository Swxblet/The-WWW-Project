// Single source of truth for The WWW Project.
// Every era (terminal / original / retro-2010 / modern) renders from here.
// Copy is based on info.cern.ch/hypertext/WWW/TheProject.html — do not invent history.

export interface InlineChunk {
  text: string;
  href?: string;
}

export interface WwwSection {
  id: string;
  heading: string;
  paragraphs: InlineChunk[][];
}

export interface WwwContent {
  title: string;
  headerNote: string;
  intro: InlineChunk[][];
  sections: WwwSection[];
  footerNote: InlineChunk[][];
}

const CERN = 'http://info.cern.ch/hypertext/WWW';

export const wwwContent: WwwContent = {
  title: 'World Wide Web',
  headerNote: 'The World Wide Web project',
  intro: [
    [
      { text: 'The WorldWideWeb (W3) is a wide-area ' },
      { text: 'hypermedia', href: `${CERN}/WhatIs.html` },
      {
        text: ' information retrieval initiative aiming to give universal access to a large universe of documents.'
      }
    ],
    [
      { text: 'Everything there is online about W3 is linked directly or indirectly to this document, including an ' },
      { text: 'executive summary', href: `${CERN}/Summary.html` },
      { text: ' of the project, ' },
      { text: 'Mailing lists', href: `${CERN}/Administration/Mailing/Overview.html` },
      { text: ' , ' },
      { text: 'Policy', href: `${CERN}/Policy.html` },
      { text: " , November's " },
      { text: 'W3 news', href: `${CERN}/News/9211.html` },
      { text: ' , ' },
      { text: 'Frequently Asked Questions', href: `${CERN}/FAQ/List.html` },
      { text: ' .' }
    ]
  ],
  sections: [
    {
      id: 'whats-out-there',
      heading: "What's out there?",
      paragraphs: [
        [
          { text: "Pointers to the world's online information, " },
          { text: 'subjects', href: 'http://info.cern.ch/hypertext/DataSources/bySubject/Overview.html' },
          { text: ' , ' },
          { text: 'W3 servers', href: 'http://info.cern.ch/hypertext/DataSources/WWW/Servers.html' },
          { text: ', etc.' }
        ]
      ]
    },
    {
      id: 'help',
      heading: 'Help',
      paragraphs: [[{ text: 'on the browser you are using', href: `${CERN}/Help.html` }]]
    },
    {
      id: 'software',
      heading: 'Software Products',
      paragraphs: [
        [
          { text: 'A list of W3 project components and their current state. (e.g. ' },
          { text: 'Line Mode', href: `${CERN}/LineMode/Browser.html` },
          { text: ' ,X11 ' },
          { text: 'Viola', href: `${CERN}/Status.html#35` },
          { text: ' , ' },
          { text: 'NeXTStep', href: `${CERN}/NeXT/WorldWideWeb.html` },
          { text: ' , ' },
          { text: 'Servers', href: `${CERN}/Daemon/Overview.html` },
          { text: ' , ' },
          { text: 'Tools', href: `${CERN}/Tools/Overview.html` },
          { text: ' , ' },
          { text: 'Mail robot', href: `${CERN}/MailRobot/Overview.html` },
          { text: ' , ' },
          { text: 'Library', href: `${CERN}/Status.html#57` },
          { text: ' )' }
        ]
      ]
    },
    {
      id: 'technical',
      heading: 'Technical',
      paragraphs: [
        [{ text: 'Details of protocols, formats, program internals etc', href: `${CERN}/Technical.html` }]
      ]
    },
    {
      id: 'bibliography',
      heading: 'Bibliography',
      paragraphs: [
        [{ text: 'Paper documentation on W3 and references.', href: `${CERN}/Bibliography.html` }]
      ]
    },
    {
      id: 'people',
      heading: 'People',
      paragraphs: [
        [{ text: 'A list of some people involved in the project.', href: `${CERN}/People.html` }]
      ]
    },
    {
      id: 'history',
      heading: 'History',
      paragraphs: [
        [{ text: 'A summary of the history of the project.', href: `${CERN}/History.html` }]
      ]
    },
    {
      id: 'helping',
      heading: 'How can I help ?',
      paragraphs: [
        [{ text: 'If you would like to support the web..', href: `${CERN}/Helping.html` }]
      ]
    },
    {
      id: 'getting-code',
      heading: 'Getting code',
      paragraphs: [
        [
          { text: 'Getting the code by ' },
          { text: 'anonymous FTP', href: `${CERN}/LineMode/Defaults/Distribution.html` },
          { text: ' , etc.' }
        ]
      ]
    }
  ],
  footerNote: [
    [
      { text: 'Original: ' },
      { text: 'info.cern.ch — TheProject.html', href: 'http://info.cern.ch/hypertext/WWW/TheProject.html' },
      { text: ' · Educational tribute, not an official CERN site.' }
    ]
  ]
};

export type EraId = 'terminal' | 'original' | 'retro-2010' | 'modern';

export const ERAS: { id: EraId; label: string }[] = [
  { id: 'terminal', label: 'Line-mode display' },
  { id: 'original', label: 'Original HTML' },
  { id: 'retro-2010', label: 'Early-2010s style' },
  { id: 'modern', label: 'Present-day setting' }
];
