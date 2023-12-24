import { ManageOptionItem } from "./_components/manage-option-item";
import { ManageOptions } from "./_components/manage-options";

export default function AdminPage() {
  return (
    <div className="lg:flex">
      <ManageOptions />
      <section className="hidden lg:block">Main Panel</section>
    </div>
  );
}
