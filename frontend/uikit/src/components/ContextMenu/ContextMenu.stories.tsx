import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ContextMenu } from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
    title: "UIKIT/ContextMenu",
    component: ContextMenu,
    parameters: {
        docs: {
            description: {
                component: `
## Описание
ContextMenu - это компонент контекстного меню, используемый во всем приложении.
Он предоставляет единообразный интерфейс для отображения дополнительных действий при правом клике.

## Особенности
- **Позиционирование**: автоматическое позиционирование по координатам клика
- **Настраиваемые пункты**: массив элементов с обработчиками кликов
- **Автозакрытие**: опциональное автоматическое закрытие после клика
- **Тематизация**: адаптация под текущую тему приложения
- **Hover эффекты**: визуальная обратная связь при наведении
- **Кастомные элементы**: поддержка ReactNode в пунктах меню
- **Хук useContextMenu**: готовый хук для управления состоянием
                `,
            },
        },
    },
    argTypes: {
        contextMenuPosition: {
            description: "Позиция меню (координаты top и left)",
            control: "object",
            table: {
                type: { summary: "{ top: number; left: number } | null" },
                defaultValue: { summary: "null" },
            },
        },
        handleClose: {
            description: "Обработчик закрытия меню",
            action: "closed",
            table: {
                type: { summary: "() => void" },
            },
        },
        items: {
            description: "Массив пунктов меню",
            control: "object",
            table: {
                type: { summary: "ContextMenuItems" },
            },
        },
        closeOnClick: {
            description: "Закрывать ли меню после клика по пункту",
            control: "boolean",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        isTable: {
            description: "Использовать стили для табличного контекстного меню",
            control: "boolean",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Controls: Story = {
    render: (args) => {
        const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(
            null
        );
        const [open, setOpen] = useState(false);
        const [selectedRow, setSelectedRow] = useState<number | null>(null);
        const tableData = [
            { id: 1, name: "Иван Иванов", email: "ivan@example.com" },
            { id: 2, name: "Петр Петров", email: "petr@example.com" },
            { id: 3, name: "Анна Сидорова", email: "anna@example.com" },
        ];
        const handleRowRightClick = (event: React.MouseEvent, rowId: number) => {
            event.preventDefault();
            setMenuPosition({ top: event.clientY, left: event.clientX });
            setOpen(true);
            setSelectedRow(rowId);
        };
        const handleClose = () => {
            setOpen(false);
            setMenuPosition(null);
            setSelectedRow(null);
        };
        const wrappedItems = (args.items || []).map((item) => ({
            ...item,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick: (e: any) => {
                item.onClick?.(e);
                if (args.closeOnClick) {
                    handleClose();
                }
            },
        }));
        return (
            <div
                style={{
                    padding: "32px",
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    position: "relative",
                }}>
                <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
                    <strong>ContextMenu</strong> — контекстное меню (ПКМ по строке таблицы)
                </div>
                <table
                    style={{
                        width: 400,
                        borderCollapse: "collapse",
                        marginBottom: 16,
                        background: "white",
                        borderRadius: 8,
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}>
                    <thead>
                        <tr style={{ background: "#f5f5f5" }}>
                            <th style={{ padding: 12, border: "1px solid #eee" }}>ID</th>
                            <th style={{ padding: 12, border: "1px solid #eee" }}>Имя</th>
                            <th style={{ padding: 12, border: "1px solid #eee" }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row) => (
                            <tr
                                key={row.id}
                                style={{
                                    background: selectedRow === row.id ? "#e3f2fd" : "white",
                                    cursor: "context-menu",
                                }}
                                onContextMenu={(e) => handleRowRightClick(e, row.id)}>
                                <td style={{ padding: 12, border: "1px solid #eee" }}>{row.id}</td>
                                <td style={{ padding: 12, border: "1px solid #eee" }}>
                                    {row.name}
                                </td>
                                <td style={{ padding: 12, border: "1px solid #eee" }}>
                                    {row.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ContextMenu
                    contextMenuPosition={open ? menuPosition : null}
                    handleClose={handleClose}
                    items={wrappedItems}
                    closeOnClick={args.closeOnClick}
                    isTable={args.isTable}
                />
                <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
                    items: <b>{wrappedItems.length}</b> пунктов
                </div>
            </div>
        );
    },
    args: {
        items: [
            { children: "Действие 1", onClick: () => alert("Действие 1") },
            { children: "Действие 2", onClick: () => alert("Действие 2") },
            { children: "Действие 3", onClick: () => alert("Действие 3") },
        ],
        closeOnClick: true,
        isTable: false,
    },
    parameters: {
        docs: {
            description: {
                story: "## Интерактивный ContextMenu\n\nМеняйте items и closeOnClick через controls справа. Открытие меню — ПКМ по строке таблицы.",
            },
        },
    },
};
