import { TrendingUp, ArrowDownToLine } from "lucide-react"
import type { UserProfile } from "@/types"

interface WalletTabProps {
  profile: UserProfile
}

export default function WalletTab({ profile }: WalletTabProps) {
  return (
    <div className="p-4 container mx-auto max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-700 mb-1">Current Balance</h3>
            <p className="text-2xl font-bold text-purple-700">π{profile.balance.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-700 mb-1">Total Earned</h3>
            <p className="text-2xl font-bold text-green-700">π{profile.totalEarned.toFixed(2)}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-700 mb-1">Pending</h3>
            <p className="text-2xl font-bold text-blue-700">
              π
              {profile.transactions
                .filter((t) => t.status === "pending")
                .reduce((acc, t) => acc + t.amount, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-purple-700 mb-6">Transaction History</h2>
        <div className="space-y-4">
          {profile.transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center space-x-4">
                {transaction.type === "earn" ? (
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="text-green-600 w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <ArrowDownToLine className="text-blue-600 w-5 h-5" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{transaction.type === "earn" ? "Earnings" : "Withdrawal"}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${transaction.type === "earn" ? "text-green-600" : "text-blue-600"}`}>
                  {transaction.type === "earn" ? "+" : "-"}π{transaction.amount.toFixed(2)}
                </p>
                <p className={`text-xs ${transaction.status === "completed" ? "text-green-500" : "text-amber-500"}`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

