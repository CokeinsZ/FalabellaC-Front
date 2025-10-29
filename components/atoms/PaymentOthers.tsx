import { Banknote, CreditCard, DollarSign } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function PaymentOthers() {
  return (
        <div>
          <h2 className="text-lg font-semibold mb-3">Otras opciones</h2>
          <div className="space-y-2">
            <Card className="cursor-pointer hover:border-gray-300 transition-all">
              <CardContent className="flex items-center gap-3 py-3">
                <Banknote className="w-4 h-4" />
                <span>Débito desde cuenta corriente o ahorros</span>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-gray-300 transition-all">
              <CardContent className="flex items-center gap-3 py-3">
                <DollarSign className="w-4 h-4" />
                <span>Pago en efectivo</span>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-gray-300 transition-all">
              <CardContent className="flex items-center gap-3 py-3">
                <CreditCard className="w-4 h-4" />
                <span>Cupón de descuento</span>
              </CardContent>
            </Card>
          </div>
        </div>
    );
}