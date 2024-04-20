import { useEffect, useRef, useState } from "react";

import { ResetIcon, PlusIcon, MinusIcon } from "@radix-ui/react-icons";

import Title from "./Title";
import Count from "./Count";
import Button from "./Button";
import Card from "./Card";

function Counter() {
  const [count, setCount] = useState(0);

  const countRef = useRef(count);

  // Updating countRef.current whenever count changes
  useEffect(() => {
    countRef.current = count;
  }, [count]); // This useEffect is solely for keeping countRef.current in sync with count

  // Setting up and tearing down event listeners
  useEffect(() => {
    const handleArrowUp = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCount(countRef.current + 1);
      }
    };

    const handleArrowDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (countRef.current === 0) return;
        setCount(countRef.current - 1);
      }
    };

    const handleSpace = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setCount(0);
      }
    };

    window.addEventListener("keydown", handleArrowUp);
    window.addEventListener("keydown", handleArrowDown);
    window.addEventListener("keydown", handleSpace);

    return () => {
      window.removeEventListener("keydown", handleArrowUp);
      window.removeEventListener("keydown", handleArrowDown);
      window.removeEventListener("keydown", handleSpace);
    };
  }, []); // Note: No dependencies here, so this setup and teardown happens only once

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);

  return (
    <Card>
      <Title title="fancy counter" />
      <Count count={count} />
      <Button
        theme={count === 0 ? "reset-btn-disabled" : "reset-btn"}
        onClick={handleReset}
        disabled={count === 0 ? true : false}
      >
        <ResetIcon className="reset-btn-icon" />
      </Button>
      <div className="button-container">
        <Button
          theme={count === 0 ? "count-btn-disabled" : "count-btn"}
          onClick={handleDecrement}
          disabled={count === 0 ? true : false}
        >
          <MinusIcon className="count-btn-icon" />
        </Button>
        <Button theme={"count-btn"} onClick={handleIncrement} disabled={false}>
          <PlusIcon className="count-btn-icon" />
        </Button>
      </div>
    </Card>
  );
}

export default Counter;
