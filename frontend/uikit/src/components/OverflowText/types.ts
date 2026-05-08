import { TooltipType } from '@/components/ITooltype'

export interface OverflowTextProps {
  children: React.ReactNode;
  className?: string;
  tooltipText?: string;
  dependencies?: React.DependencyList;
  tooltipType?: TooltipType;
}
