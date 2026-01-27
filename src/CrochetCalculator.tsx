import { useState } from "react";

const currencySymbols: Record<string, string> = {
  MXN: "$",
  USD: "$",
  COP: "$",
  ARS: "$",
  EUR: "€",
};

const currencyNames: Record<string, string> = {
MXN: "pesos",
USD: "dólares",
COP: "pesos colombianos",
ARS: "pesos argentinos",
EUR: "euros",
};

export default function CrochetCalculator() {
  const [currency, setCurrency] = useState("MXN");
  const currencyName = currencyNames[currency];

  const [yarnPrice, setYarnPrice] = useState<number | "">("");
  const [totalGrams, setTotalGrams] = useState<number | "">("");
  const [usedGrams, setUsedGrams] = useState<number | "">("");
  const [extraCosts, setExtraCosts] = useState<number | "">("");
  const [hours, setHours] = useState<number | "">("");
  const [hourPrice, setHourPrice] = useState<number | "">("");

  const [profitPercent, setProfitPercent] = useState<number | "">("");

  // Valores seguros
  const safeYarnPrice = yarnPrice || 0;
  const safeTotalGrams = totalGrams || 0;
  const safeUsedGrams = usedGrams || 0;
  const safeExtraCosts = extraCosts || 0;
  const safeHours = hours || 0;
  const safeHourPrice = hourPrice || 0;
  const safeProfitPercent = profitPercent || 0;

  // Cálculos
  const materialCost =
    safeTotalGrams > 0
      ? (safeYarnPrice / safeTotalGrams) * safeUsedGrams + safeExtraCosts
      : 0;

  const laborCost = safeHours * safeHourPrice;
  const baseCost = materialCost + laborCost;
  const profit = baseCost * (safeProfitPercent / 100);
  const finalPrice = baseCost + profit;

  const symbol = currencySymbols[currency];

  return (
    <div className="container">
      <h1>StitchPrice</h1>
      <h2>Calculadora de precios</h2>

      <label>Moneda</label>
      <select style={{color:"dimgray"}} value={currency} onChange={(e) => setCurrency(e.target.value)}>
        {Object.keys(currencySymbols).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <h4>Materiales</h4>
      <input
        type="number"
        step="0.1"
        placeholder="Precio del estambre"
        value={yarnPrice}
        onChange={(e) =>
          setYarnPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
      />

      <input
        type="number"
        step="0.1"
        placeholder="Gramos totales del estambre"
        value={totalGrams}
        onChange={(e) => setTotalGrams(e.target.value === "" ? "" : Number(e.target.value))}
      />

      <input
        type="number"
        step="0.1"
        placeholder="Gramos usados"
        value={usedGrams}
        onChange={(e) => setUsedGrams(e.target.value === "" ? "" : Number(e.target.value))}
      />

      {usedGrams > totalGrams && (
        <small style={{ opacity: 0.7, }}>
          ⚠️ Los gramos usados no pueden ser mayores al total
        </small>
      )}

      <input
        type="number"
        step="0.1"
        placeholder="Otros costos (ojitos, botones, alambre, etc)"
        value={extraCosts}
        onChange={(e) => setExtraCosts(e.target.value === "" ? "" : Number(e.target.value))}
      />

      <h4>Mano de obra</h4>
      <input
        type="number"
        step="0.1"
        placeholder="Horas trabajadas"
        value={hours}
        onChange={(e) => setHours(e.target.value === "" ? "" : Number(e.target.value))}
      />

      <input
        type="number"
        step="0.1"
        placeholder="Precio por hora"
        value={hourPrice}
        onChange={(e) => setHourPrice(e.target.value === "" ? "" : Number(e.target.value))}
      />

      <h4>Ganancia (%)</h4>
      <input
        type="number"
        step="0.1"
        placeholder="Porcentaje de ganancia"
        value={profitPercent}
        onChange={(e) =>
        setProfitPercent(e.target.value === "" ? "" : Number(e.target.value))
        }
        
      />
      <small style={{ opacity: 0.7, }}>
          Sugerido: 
      </small>
      <button onClick={() => setProfitPercent(20)}>
        20%
      </button>
      <button onClick={() => setProfitPercent(30)}>
        30%
      </button>

      <div className="containResult">
        <h3 className="result">Resultado</h3>
        <p>
          Costo real: <strong style={{ paddingLeft:37 }}>{symbol}{finalPrice.toFixed(2)} {currencyName}</strong>
        </p>
        <p>
          Ganancia: <strong style={{ paddingLeft:42 }}>{symbol}{finalPrice.toFixed(2)} {currencyName}</strong>
        </p>
        <p style={{ color:"#02332f", }}>
          Precio sugerido:{" "}
          <strong style={{ color:"#02332f", }}>{symbol}{finalPrice.toFixed(2)} {currencyName}</strong>
        </p>
        <small style={{ opacity: 0.7 }}>
          *El precio final lo decides tú según tu mercado y experiencia.
        </small>
      </div>
    </div>
  );
}