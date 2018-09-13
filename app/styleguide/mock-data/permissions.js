export default {
  permissions: [
    {
      name: 'role',
      title: 'Rolle',
      type: 'radio',
      options: [
        {
          label: 'Administrator',
          id: '01',
          active: true,
        },
        {
          label: 'Benutzer',
          id: '02',
          active: false,
        },
      ],
    },
    {
      name: 'history',
      title: 'Auftragshistory',
      type: 'checkbox',
      options: [
        {
          label: 'Kontoauszug / OP anzeigen',
          id: '01',
          active: true,
        },
        {
          label: 'Alle Aufträge / Fakturen anzeigen',
          id: '02',
          active: false,
        },
        {
          label: 'Gutschriften anzeigen',
          id: '03',
          active: true,
        },
      ],
    },
    {
      name: 'process',
      title: 'Bestellprozess',
      type: 'checkbox',
      options: [
        {
          label: 'Bestellungen tätigen',
          id: '01',
          active: true,
        },
        {
          label: 'Warenkörbe freigeben',
          id: '02',
          active: false,
        },
      ],
    },
    {
      name: 'customerData',
      title: 'Kundendaten',
      type: 'checkbox',
      options: [
        {
          label: 'Nettopreis anzeigen',
          id: '01',
          active: true,
        },
        {
          label: 'Kundenindividuelle Downloads',
          id: '02',
          active: true,
        },
        {
          label: 'Bruttopreise anzeigen',
          id: '03',
          active: true,
        },
      ],
    },
  ],
};
