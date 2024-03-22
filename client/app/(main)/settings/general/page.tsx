import { ThemeToggle } from "@/components/theming/ThemeToggle";

const GeneralSettingsPage = () => {
  return (
    <div>
        <div className="py-4">
        <hr />
      </div>
      <div>
        <h3 className="text-lg">Внешний вид</h3>
        <ThemeToggle align="start" />
      </div>
    </div>
  );
};

export default GeneralSettingsPage;
