import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MoreVertical, Settings, RefreshCw, Expand, Download } from 'lucide-react';
import { ResponsiveContainer } from 'recharts';

export interface WidgetConfig {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'list' | 'custom';
  size: 'small' | 'medium' | 'large' | 'xlarge';
  position: { x: number; y: number };
  data?: any;
  refreshable?: boolean;
  expandable?: boolean;
  exportable?: boolean;
}

interface DashboardWidgetProps {
  config: WidgetConfig;
  onRefresh?: () => void;
  onExpand?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const DashboardWidget = ({
  config,
  onRefresh,
  onExpand,
  onExport,
  onSettings,
  isLoading = false,
  children
}: DashboardWidgetProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small': return 'col-span-1 row-span-1';
      case 'medium': return 'col-span-2 row-span-1';
      case 'large': return 'col-span-2 row-span-2';
      case 'xlarge': return 'col-span-3 row-span-2';
      default: return 'col-span-1 row-span-1';
    }
  };

  return (
    <Card className={`relative ${getSizeClasses(config.size)}`}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <div>
          <h3 className="font-semibold text-[var(--foreground)]">{config.title}</h3>
          {config.type === 'chart' && (
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Interactive {config.type} visualization
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          {config.refreshable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="w-8 h-8 p-0"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </Button>
          )}

          {config.expandable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onExpand}
              className="w-8 h-8 p-0"
            >
              <Expand size={14} />
            </Button>
          )}

          {config.exportable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              className="w-8 h-8 p-0"
            >
              <Download size={14} />
            </Button>
          )}

          {/* Settings Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 p-0"
            >
              <MoreVertical size={14} />
            </Button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onSettings?.();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--muted)] flex items-center gap-2"
                  >
                    <Settings size={14} />
                    Widget Settings
                  </button>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--muted)]"
                  >
                    Remove Widget
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Widget Content */}
      <div className="p-4 h-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <RefreshCw size={24} className="animate-spin text-[var(--muted-foreground)]" />
          </div>
        ) : (
          children
        )}
      </div>

      {/* Resize Handle */}
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-[var(--border)]" />
      </div>
    </Card>
  );
};