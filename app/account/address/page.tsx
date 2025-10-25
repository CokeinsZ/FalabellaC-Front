import PersonalAddress from "@/components/molecules/account/PersonalAddress";
import PerfilPage from "@/components/molecules/AccountPage";

export default function Account() {
  return (
    <div>
      <main className="flex-1 p-6 flex justify-center items-start">
              <PersonalAddress />
            </main>
    </div>
  );
}
