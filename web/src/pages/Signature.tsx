import { useState } from 'react'
import { Card, CardBody, CardFooter } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function SignaturePage() {
  const [step, setStep] = useState<'start' | 'generated' | 'signed'>('start')
  return (
    <Card>
      <CardBody>
        <h1 className="text-2xl font-semibold">Signatur (Demo)</h1>
        {step === 'start' && <p className="text-black/70 mt-2">Starte den Demo-Prozess zur Signatur.</p>}
        {step === 'generated' && <p className="text-black/70 mt-2">Dokument erzeugt. Prüfe die Inhalte und fahre fort.</p>}
        {step === 'signed' && <p className="text-black/70 mt-2">Signiert. Der Prozess ist abgeschlossen.</p>}
      </CardBody>
      <CardFooter>
        {step === 'start' && <Button onClick={() => setStep('generated')}>Dokument erzeugen</Button>}
        {step === 'generated' && (
          <>
            <Button onClick={() => setStep('signed')}>Signieren</Button>
            <Button variant="ghost" onClick={() => setStep('start')}>Zurücksetzen</Button>
          </>
        )}
        {step === 'signed' && <Button onClick={() => setStep('start')}>Neu starten</Button>}
      </CardFooter>
    </Card>
  )
}


