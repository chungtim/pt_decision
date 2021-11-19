var data = [
    {
        "name": "Total",
        "num": "0",
        "display": "Treat/¬Treat",
        "parent": "null",
        "children": [
            {
                "name": "Treat",
                "num": "1",
                "display": "Treat",
                "children": [
                    {
                        "name": "Treat&Cure",
                        "num": "3",
                        "display": "Cure",
                        "givenName": "P(Cure|Treat)",
                        "given": ".30",
                        "children": [
                            {
                                "name": "Treat&Cure&Symptoms",
                                "display": "Symptoms",
                                "num": "7",
                                "display": "Symptoms",
                                "givenName": "P(Symptoms|TC)",
                                "given": ".40",
                                "value": "50"
                            },
                            {
                                "name": "Treat&Cure&¬Symptoms",
                                "display": "¬Symptoms",
                                "num": "8",
                                "givenName": "P(¬Symptoms|TC)",
                                "value": "100"
                            }
                        ]
                    },
                    {
                        "name": "Treat&¬Cure",
                        "num": "4",
                        "display": "¬Cure",
                        "givenName": "P(¬Cure|Treat)",
                        "children": [
                            {
                                "name": "Treat&¬Cure&Symptoms",
                                "display": "P(Symptoms|T¬C)",
                                "num": "9",
                                "display": "Symptoms",
                                "givenName": "P(Symptoms|T¬C)",
                                "given": ".40",
                                "value": "10"
                            },
                            {
                                "name": "Treat&¬Cure&¬Symptoms",
                                "display": "¬Symptoms",
                                "num": "10",
                                "givenName": "P(¬Symptoms|T¬C)",
                                "value": "40"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "¬ Treat",
                "display": "¬ Treat",
                "num": "2",
                "children": [
                    {
                        "name": "¬Treat&Cure",
                        "display": "Cure",
                        "num": "5",
                        "given": ".20",
                        "givenName": "P(Cure|¬Treat)",
                        "children": [
                            {
                                "name": "¬Treat&Cure&Symptoms",
                                "display": "Symptoms",
                                "num": "11",
                                "givenName": "P(Symptoms|¬TC)",
                                "given": ".10",
                                "value": "10"
                            },
                            {
                                "name": "¬Treat&Cure&¬Symptoms",
                                "display": "¬Symptoms",
                                "num": "12",
                                "givenName": "P(¬Symptoms|¬TC)",
                                "value": "10"
                            }
                        ]
                    },
                    {
                        "name": "¬Treat&¬Cure",
                        "display": "¬Cure",
                        "num": "6",
                        "given": ".9",
                        "givenName": "P(¬Treat|¬Cure)",
                        "children": [
                            {
                                "name": "¬Treat&¬Cure&Symptoms",
                                "display": "Symptoms",
                                "num": "13",
                                "givenName": "P(Symptoms|¬T¬C)",
                                "given": ".10",
                                "value": "10"
                            },
                            {
                                "name": "¬Treat&¬Cure&¬Symptoms",
                                "display": "¬Symptoms",
                                "num": "14",
                                "givenName": "P(¬Symptoms|¬T¬C)",
                                "value": "10"
                            }
                        ]
                    }

                ]
            }

        ]
    }
];

export {data};