import type {
  TreeSelectGetChildren,
  TreeSelectGetId,
  TreeSelectGetLabel,
} from "./types";

export interface TreeViewNode<T> {
  node: T;
  children: TreeViewNode<T>[];
}

export interface TreeRow<T> {
  node: T;
  level: number;
  hasChildrenVisible: boolean;
}

export function buildOriginalTreeIndex<T>(params: {
  options: T[];
  getId: TreeSelectGetId<T>;
  getChildren: TreeSelectGetChildren<T>;
}): {
  hasChildrenById: Map<string, boolean>;
  nodeById: Map<string, T>;
} {
  const hasChildrenById = new Map<string, boolean>();
  const nodeById = new Map<string, T>();

  const walk = (n: T) => {
    const id = params.getId(n);
    nodeById.set(id, n);
    const children = params.getChildren(n) ?? [];
    hasChildrenById.set(id, children.length > 0);
    children.forEach(walk);
  };

  params.options.forEach(walk);
  return { hasChildrenById, nodeById };
}

export function buildTreeView<T>(params: {
  options: T[];
  getChildren: TreeSelectGetChildren<T>;
}): TreeViewNode<T>[] {
  const walk = (n: T): TreeViewNode<T> => {
    const children = params.getChildren(n) ?? [];
    return {
      node: n,
      children: children.map(walk),
    };
  };

  return params.options.map(walk);
}

export function filterTreeView<T>(params: {
  tree: TreeViewNode<T>[];
  query: string;
  getId: TreeSelectGetId<T>;
  getLabel: TreeSelectGetLabel<T>;
}): {
  tree: TreeViewNode<T>[];
  autoExpandIds: Set<string>;
} {
  const q = params.query.trim().toLowerCase();
  if (!q) {
    return { tree: params.tree, autoExpandIds: new Set() };
  }

  const autoExpandIds = new Set<string>();

  const walk = (n: TreeViewNode<T>): TreeViewNode<T> | null => {
    const label = params.getLabel(n.node).toLowerCase();
    const selfMatch = label.includes(q);

    // Если совпал сам узел — оставляем ВСЁ его поддерево, чтобы можно было раскрыть и выбрать лист ниже
    if (selfMatch) {
      if (n.children.length > 0) {
        autoExpandIds.add(params.getId(n.node));
      }
      return { node: n.node, children: n.children };
    }

    const keptChildren: TreeViewNode<T>[] = [];
    for (const c of n.children) {
      const kept = walk(c);
      if (kept) {
        keptChildren.push(kept);
      }
    }

    const keep = selfMatch || keptChildren.length > 0;
    if (!keep) {
      return null;
    }

    if (keptChildren.length > 0) {
      autoExpandIds.add(params.getId(n.node));
    }

    return { node: n.node, children: keptChildren };
  };

  const filtered: TreeViewNode<T>[] = [];
  for (const n of params.tree) {
    const kept = walk(n);
    if (kept) {
      filtered.push(kept);
    }
  }

  return { tree: filtered, autoExpandIds };
}

export function flattenTreeView<T>(params: {
  tree: TreeViewNode<T>[];
  expandedIds: Set<string>;
  getId: TreeSelectGetId<T>;
  levelStart?: number;
}): TreeRow<T>[] {
  const rows: TreeRow<T>[] = [];
  const start = params.levelStart ?? 1;

  const walk = (n: TreeViewNode<T>, level: number) => {
    const hasChildrenVisible = n.children.length > 0;
    rows.push({ node: n.node, level, hasChildrenVisible });

    if (!hasChildrenVisible) {
      return;
    }

    const id = params.getId(n.node);
    if (!params.expandedIds.has(id)) {
      return;
    }

    n.children.forEach((c) => walk(c, level + 1));
  };

  params.tree.forEach((n) => walk(n, start));
  return rows;
}

export function toggleExpandedId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}
