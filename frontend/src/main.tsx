import React from "react";
import ReactDOM from "react-dom/client";
import { CheckCircle2, Clock3, Plus, RefreshCw, Trash2 } from "lucide-react";
import "./styles.css";

type RequestStatus = "NEW" | "IN_PROGRESS" | "DONE" | "CANCELED";

type ServiceRequest = {
  id: number;
  title: string;
  description: string;
  requesterName: string;
  requesterEmail: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "/api/requests";

const statusLabels: Record<RequestStatus, string> = {
  NEW: "Новая",
  IN_PROGRESS: "В работе",
  DONE: "Закрыта",
  CANCELED: "Отменена",
};

const statusOptions = Object.keys(statusLabels) as RequestStatus[];

function App() {
  const [requests, setRequests] = React.useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    requesterName: "",
    requesterEmail: "",
  });

  const loadRequests = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Не удалось загрузить заявки");
      }
      setRequests(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.title.trim()) {
      setError("Заполните тему заявки");
      return;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, title: form.title.trim() }),
    });

    if (!response.ok) {
      setError("Проверьте поля формы");
      return;
    }

    setForm({ title: "", description: "", requesterName: "", requesterEmail: "" });
    await loadRequests();
  }

  async function updateStatus(id: number, status: RequestStatus) {
    await fetch(`${API_URL}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await loadRequests();
  }

  async function deleteRequest(id: number) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await loadRequests();
  }

  const activeCount = requests.filter((request) => request.status !== "DONE" && request.status !== "CANCELED").length;

  return (
    <main className="app-shell">
      <section className="summary-band">
        <div>
          <p className="eyebrow">Сервис заявок</p>
          <h1>Обработка обращений</h1>
        </div>
        <div className="metrics">
          <div>
            <span>{requests.length}</span>
            <p>всего</p>
          </div>
          <div>
            <span>{activeCount}</span>
            <p>активных</p>
          </div>
        </div>
      </section>

      <section className="workspace">
        <form className="request-form" onSubmit={submitRequest}>
          <h2>Новая заявка</h2>
          <label>
            Тема *
            <input
              required
              maxLength={160}
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
            />
          </label>
          <label>
            Описание
            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
            />
          </label>
          <label>
            Имя
            <input
              required
              maxLength={120}
              value={form.requesterName}
              onChange={(event) => setForm({ ...form, requesterName: event.target.value })}
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              maxLength={160}
              value={form.requesterEmail}
              onChange={(event) => setForm({ ...form, requesterEmail: event.target.value })}
            />
          </label>
          <button className="primary-button" type="submit">
            <Plus size={18} />
            Создать
          </button>
        </form>

        <section className="requests-panel">
          <div className="panel-head">
            <h2>Заявки</h2>
            <button className="icon-button" type="button" onClick={loadRequests} aria-label="Обновить">
              <RefreshCw size={18} />
            </button>
          </div>

          {error && <div className="error">{error}</div>}
          {isLoading && <div className="empty">Загрузка...</div>}
          {!isLoading && requests.length === 0 && <div className="empty">Заявок пока нет</div>}

          <div className="request-list">
            {requests.map((request) => (
              <article className="request-card" key={request.id}>
                <div className="request-main">
                  <div className={`status-dot status-${request.status.toLowerCase()}`} />
                  <div>
                    <h3>{request.title}</h3>
                    <p>{request.description}</p>
                    <div className="request-meta">
                      <span>{request.requesterName}</span>
                      <span>{request.requesterEmail}</span>
                      <span>{new Date(request.createdAt).toLocaleString("ru-RU")}</span>
                    </div>
                  </div>
                </div>

                <div className="request-actions">
                  <select
                    value={request.status}
                    onChange={(event) => updateStatus(request.id, event.target.value as RequestStatus)}
                    aria-label="Статус заявки"
                  >
                    {statusOptions.map((status) => (
                      <option value={status} key={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                  <button className="icon-button danger" type="button" onClick={() => deleteRequest(request.id)} aria-label="Удалить">
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <footer>
        <Clock3 size={16} />
        <span>Новые заявки создаются со статусом</span>
        <strong>
          <CheckCircle2 size={16} />
          {statusLabels.NEW}
        </strong>
      </footer>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
