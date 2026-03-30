import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NotificationsSettingsForm } from "@/components/admin/notifications-settings-form";
import { getNotificationSettings } from "@/lib/settings";

export default async function SettingsPage() {
  const settings = await getNotificationSettings();

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="настройки"
        title="Уведомления"
        description="Настройте каналы оповещения — заявки с сайта будут приходить менеджерам в Telegram и MAX."
      />

      <NotificationsSettingsForm
        initialTelegramToken={settings.telegram.token}
        initialTelegramChatId={settings.telegram.chatId}
        initialMaxToken={settings.max.token}
        initialMaxChatId={settings.max.chatId}
      />
    </div>
  );
}
