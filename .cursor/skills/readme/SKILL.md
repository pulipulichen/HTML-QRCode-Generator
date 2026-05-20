---
name: readme
description: 撰寫或改寫 README 時使用的規則，確保內容與實際系統功能一致，並在雙語 README（README.md / README_zh_tw.md）場景中維持同步
---

# README Skill

## Language

以繁體中文撰寫；需要雙語 README 時，提供繁中與英文兩份文件並保持同步。

## Purpose

在整理、改寫或新增 README 時，產出清楚、可維護且與目前程式功能一致的文件。

## Bilingual README Rules

若專案採雙語 README，必須遵守以下規則：

1. README 必須同時維護 `README.md`（English）與 `README_zh_tw.md`（繁體中文）。
2. `README_zh_tw.md` 檔名固定，不可改為其他命名。
3. 任一 README 有變更時，必須在同一任務同步更新另一個語言版本。
4. 兩份 README 皆需在檔案前段提供互相切換連結：
   - `[English](./README.md)`
   - `[繁體中文](./README_zh_tw.md)`
5. 兩份 README 需維持章節結構與語意一致（可自然翻譯，不必逐字對照）。

## Required Checks

每次改寫 README 前，必做「功能一致性檢查」：

1. 以目前程式碼與設定為準，不沿用舊文案中的假設。
2. 逐項核對 README 的功能描述與實際行為是否一致（功能名稱、流程、限制、支援語系、儲存行為等）。
3. 技術堆疊需以實際引用的函式庫與版本來源為準，不可沿用過時資訊。
4. 若原文與現況不一致，優先修正 README 文案，不憑空新增未實作功能。
5. 無法確認時，先標記待確認項目，避免寫入可能錯誤的敘述。

## Workflow

1. 先讀取現有 README（單語或雙語）。
2. 確認本次修改是內容修正、結構調整，或語言同步。
3. 先完成來源語言改寫，再同步更新另一語言。
4. 重新檢查雙語切換連結、章節一致性與使用者可操作性敘述。
5. 執行 markdown lint（若可用）並修正可立即處理的格式問題。

## Output Structure

建議至少包含：

- 專案簡介（以使用者視角）
- 功能重點（與現況一致）
- 技術堆疊（與實作一致）
- 使用方式（若專案已有可執行流程）
