"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

import type {
  CreateTransactionItemInput,
} from "@/types/finance";

interface Props {
  value: CreateTransactionItemInput[];

  onChange: (
    items: CreateTransactionItemInput[]
  ) => void;
}

export function TransactionItemsEditor({
  value,
  onChange,
}: Props) {
  const addItem = () => {
    onChange([
      ...value,
      {
        name: "",
        quantity: 1,
        unit_price: 0,
        total: 0,
      },
    ]);
  };

  const updateItem = (
    index: number,
    field: keyof CreateTransactionItemInput,
    fieldValue: string | number
  ) => {
    const items = [...value];

    items[index] = {
      ...items[index],
      [field]: fieldValue,
    };

    items[index].total =
      items[index].quantity *
      items[index].unit_price;

    onChange(items);
  };

  const removeItem = (
    index: number
  ) => {
    onChange(
      value.filter(
        (_, i) => i !== index
      )
    );
  };

  const total = value.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return (
    <div className="rounded-2xl border bg-muted/20 p-4 space-y-4">

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">
            Productos
          </h3>

          <p className="text-xs text-muted-foreground">
            Agrega cada producto de la compra.
          </p>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-muted"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-12 gap-2 px-1 text-xs font-semibold uppercase text-muted-foreground">
          <div className="col-span-5">
            Producto
          </div>

          <div className="col-span-2 text-center">
            Cant.
          </div>

          <div className="col-span-3 text-center">
            Valor
          </div>

          <div className="col-span-2 text-center">
            Total
          </div>
        </div>
      )}

      {value.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border bg-background p-3"
        >
          <div className="space-y-3">

            <input
              className="w-full rounded-lg border p-2"
              placeholder="Ej: Pañales"
              value={item.name}
              onChange={(e) =>
                updateItem(
                  index,
                  "name",
                  e.target.value
                )
              }
            />

            <div className="grid grid-cols-12 gap-2">

              <input
                type="number"
                min={1}
                className="col-span-3 rounded-lg border p-2 text-center"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <input
                type="number"
                min={0}
                className="col-span-5 rounded-lg border p-2"
                placeholder="Precio"
                value={
                  item.unit_price || ""
                }
                onChange={(e) =>
                  updateItem(
                    index,
                    "unit_price",
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <div className="col-span-3 flex items-center justify-end rounded-lg bg-muted px-2 font-semibold">
                $
                {item.total.toLocaleString(
                  "es-CO"
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  removeItem(index)
                }
                className="flex items-center justify-center rounded-lg border hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>

            </div>

          </div>
        </div>
      ))}

      {value.length === 0 && (
        <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          Aún no has agregado productos.
        </div>
      )}

      <div className="rounded-xl bg-primary/5 border p-4">

        <div className="flex items-center justify-between">

          <span className="text-muted-foreground">
            Total de la compra
          </span>

          <span className="text-2xl font-bold">
            $
            {total.toLocaleString(
              "es-CO"
            )}
          </span>

        </div>

      </div>

    </div>
  );
}