import { useEffect, useState } from "react";

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

interface GreetingProps {
  name?: string;
}

export function Greeting({ name = "Goodness" }: GreetingProps) {
  const [greeting, setGreeting] = useState(() => getGreeting(new Date().getHours()));

  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting(new Date().getHours())), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-h">
        {greeting}, {name} ✨
      </h1>
      <p className="text-text-muted">Ready to play?</p>
    </div>
  );
}