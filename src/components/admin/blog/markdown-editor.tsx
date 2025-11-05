"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Code } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.getElementById("markdown-content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 pb-2 border-b">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("**", "**")}
        >
          <strong>B</strong>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("*", "*")}
        >
          <em>I</em>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("[", "](url)")}
        >
          Link
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("## ")}
        >
          H2
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("### ")}
        >
          H3
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("- ")}
        >
          List
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("```\n", "\n```")}
        >
          Code
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown("> ")}
        >
          Quote
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "edit" | "preview")}>
        <TabsList>
          <TabsTrigger value="edit">
            <Code className="size-4 mr-2" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="size-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-4">
          <Textarea
            id="markdown-content"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your blog post content here using Markdown..."
            rows={20}
            className="font-mono"
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <div className="min-h-[500px] rounded-md border p-4 prose prose-sm max-w-none dark:prose-invert">
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">Nothing to preview yet...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
