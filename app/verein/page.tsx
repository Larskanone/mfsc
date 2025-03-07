import { Box, Grid } from "@mui/joy";

export default function Verein() {

    return (
        <>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid xs={6} md={8}>
                    <ul>
                        <li>Zur Zeit bestehen wir aus etwas mehr als 40 Mitgliedern.</li>
                        <li> Unser Ziel ist das freie und ungezwungene Fliegen mit Motor- und Segelflugmodellen vom kleinen Park-Flyer bis hin zum Großmodell.</li>
                        <li> Uns steht ein Flugplatz mit guter, asphaltierter Anfahrt und einer Rasenfläche von ca. 6000 qm zur Verfügung.</li>
                        <li> Desweiteren haben wir auch  die Aufstiegsgenehmigung für Modelle bis 25 kg.</li>
                        <li> Wir bieten Neueinsteigern jeden Alters die Gelegenheit, über das Lehrer-Schüler-Fliegen, das Steuern von Modellflugzeugen zu erlernen.</li>
                    </ul>
                </Grid>

            </Grid>
        </>
    );
}
